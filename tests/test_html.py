import json
from html.parser import HTMLParser
import os

class LDJSONExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self._capture = False
        self.data = []

    def handle_starttag(self, tag, attrs):
        if tag == "script" and dict(attrs).get("type") == "application/ld+json":
            self._capture = True

    def handle_endtag(self, tag):
        if tag == "script" and self._capture:
            self._capture = False

    def handle_data(self, data):
        if self._capture:
            self.data.append(data)


def test_html_parses():
    parser = HTMLParser()
    with open(os.path.join(os.path.dirname(__file__), '..', 'index.html'), encoding='utf-8') as f:
        parser.feed(f.read())


def test_json_ld_valid():
    extractor = LDJSONExtractor()
    with open(os.path.join(os.path.dirname(__file__), '..', 'index.html'), encoding='utf-8') as f:
        html = f.read()
    extractor.feed(html)
    ld_json = ''.join(extractor.data).strip()
    assert ld_json, "No JSON-LD found"
    json.loads(ld_json)
