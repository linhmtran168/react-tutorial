'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

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

var _fs2 = _interopRequireWildcard(_fs);

var _path = require('path');

var _path2 = _interopRequireWildcard(_path);

var _express = require('express');

var _express2 = _interopRequireWildcard(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireWildcard(_bodyParser);

var _debug = require('debug');

var _debug2 = _interopRequireWildcard(_debug);

let app = _express2['default']();
let error = _debug2['default']('app:error');

app.set('port', process.env.PORT || 3000);

app.use('/', _express2['default']['static'](_path2['default'].join(__dirname, '../public')));
app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({ extended: true }));

app.get('/comments.json', function (req, res) {
  _fs2['default'].readFile('comments.json', function (err, data) {
    if (err) {
      error(err.stack);
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments.json', function (req, res) {
  _fs2['default'].readFile('comments.json', function (err, data) {
    if (err) {
      error(err.stack);
    }

    let comments = JSON.parse(data);
    comments.push(req.body);
    _fs2['default'].writeFile('comments.json', JSON.stringify(comments, null, 4), function (err) {
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