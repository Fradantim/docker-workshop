# python images api

This app stores images in file system storage.

## Requirements

- python 3.7 or newer

## Install required despendencies

```sh
pip install flask
```

## Start

Note: this app requires the `UPLOAD_FOLDER` environment variable to be set

### Linux
```sh
export UPLOAD_FOLDER=/full/path/to/upload-folder
python app_images.py
```

### Windows
```bat
set UPLOAD_FOLDER=C:\full\path\to\uploads-folder
python app_images.py
```

# Healthcheck

HTTP GET request to /health should return status `200` and body

> Everything is awesome