
"""
Prototype: download audio from YouTube and estimate tempo + key using librosa.

Usage:
  python scripts/youtube_key_bpm.py <youtube-url> [--out out.wav]

Requirements:
  - ffmpeg installed and available on PATH
  - python 3.9+
  - pip install -r scripts/requirements.txt

This script is a simple prototype. Key detection uses a chroma-based Krumhansl-Schmuckler correlation.
"""
import sys
import subprocess
import tempfile
import os
import argparse
import numpy as np
import librosa

Krumhansl_major = np.array([6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88])
Krumhansl_minor = np.array([6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17])

NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']


def download_audio(youtube_url: str, out_path: str):
    # use yt-dlp to download best audio and convert to wav via ffmpeg
    cmd = [
        'yt-dlp',
        '--extract-audio',
        '--audio-format', 'wav',
        '--output', out_path,
        youtube_url,
    ]
    subprocess.check_call(cmd)


def estimate_tempo(y, sr):
    # librosa.beat.tempo returns estimated tempo(s)
    tempo = librosa.beat.tempo(y=y, sr=sr)
    if isinstance(tempo, np.ndarray):
        return float(np.median(tempo))
    return float(tempo)


def estimate_key(y, sr):
    # Compute chroma, aggregate across time, correlate with K-S profiles
    chroma = librosa.feature.chroma_cens(y=y, sr=sr)
    profile = chroma.mean(axis=1)
    # normalize
    profile = profile / (np.linalg.norm(profile) + 1e-9)

    best = None
    best_val = -1
    for root in range(12):
        # rotate K-S vectors to align with candidate root
        maj = np.roll(Krumhansl_major, root)
        minr = np.roll(Krumhansl_minor, root)
        maj = maj / (np.linalg.norm(maj) + 1e-9)
        minr = minr / (np.linalg.norm(minr) + 1e-9)
        v_maj = profile.dot(maj)
        v_min = profile.dot(minr)
        if v_maj > best_val:
            best_val = v_maj
            best = (root, 'major', v_maj)
        if v_min > best_val:
            best_val = v_min
            best = (root, 'minor', v_min)
    root_idx, scale, score = best
    return NOTE_NAMES[root_idx], scale, float(score)


def analyze_file(path):
    y, sr = librosa.load(path, sr=22050, mono=True)
    tempo = estimate_tempo(y, sr)
    key_root, mode, score = estimate_key(y, sr)
    return {
        'tempo': int(round(tempo)),
        'keyRoot': key_root.replace('#','b') if '#' not in key_root else key_root.replace('#','♯'),
        'key': f"{key_root} {mode}",
        'mode': mode,
        'confidence': score,
    }


def main():
    p = argparse.ArgumentParser()
    p.add_argument('url')
    p.add_argument('--out', default='-')
    args = p.parse_args()

    # produce temporary filename for wav
    with tempfile.TemporaryDirectory() as td:
        out_pattern = os.path.join(td, 'audio.%(ext)s')
        try:
            print('Downloading audio...')
            download_audio(args.url, out_pattern)
            # yt-dlp will produce a file like audio.wav in td
            wav_path = os.path.join(td, 'audio.wav')
            if not os.path.exists(wav_path):
                # find any wav file in td
                for f in os.listdir(td):
                    if f.lower().endswith('.wav'):
                        wav_path = os.path.join(td, f)
                        break
            print('Analyzing audio...')
            res = analyze_file(wav_path)
            print('Result:', res)
        except subprocess.CalledProcessError as e:
            print('Error running yt-dlp/ffmpeg:', e)
            sys.exit(2)

if __name__ == '__main__':
    main()
