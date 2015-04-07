'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var _fs = require('fs');

var fs = _interopRequire(_fs);

var _path = require('path');

var path = _interopRequire(_path);

var _express = require('express');

var express = _interopRequire(_express);

var _bodyParser = require('body-parser');

var bodyParser = _interopRequire(_bodyParser);

var _debug = require('debug');

var debug = _interopRequire(_debug);

var app = express();
var error = debug('app:error');

app.set('port', process.env.PORT || 3000);

app.use('/', express['static'](path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments.json', function (req, res) {
  fs.readFile('comments.json', function (err, data) {
    if (err) {
      error(err.stack);
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments.json', function (req, res) {
  fs.readFile('comments.json', function (err, data) {
    if (err) {
      error(err.stack);
    }

    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function (err) {
      if (err) {
        error(err.stack);
      }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(JSON.stringify(comments));
    });
  });
});

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});