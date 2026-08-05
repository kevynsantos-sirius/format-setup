#!/usr/bin/env python3
from pathlib import Path

source_path = Path("/opt/format-s3-console/s3-console-src.py")
source = source_path.read_text(encoding="utf-8")
source = source.replace("or not file_item:", "or file_item is None:")

globals_dict = {
    "__name__": "__main__",
    "__file__": str(source_path),
}
exec(compile(source, str(source_path), "exec"), globals_dict)
