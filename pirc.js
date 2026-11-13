// PiRC extension 0.3.2-dev+a3abbba8df6f. Third-party code in this file: @bufbuild/protobuf@2.16.0, ws@8.22.0; see NOTICE.
import { createRequire as __pircCreateRequire } from "node:module";
const require = __pircCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/constants.js"(exports, module) {
    "use strict";
    var BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"];
    var hasBlob = typeof Blob !== "undefined";
    if (hasBlob) BINARY_TYPES.push("blob");
    module.exports = {
      BINARY_TYPES,
      CLOSE_TIMEOUT: 3e4,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob,
      kForOnEventAttribute: /* @__PURE__ */ Symbol("kIsForOnEventAttribute"),
      kListener: /* @__PURE__ */ Symbol("kListener"),
      kStatusCode: /* @__PURE__ */ Symbol("status-code"),
      kWebSocket: /* @__PURE__ */ Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/buffer-util.js"(exports, module) {
    "use strict";
    var { EMPTY_BUFFER: EMPTY_BUFFER2 } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    function concat(list, totalLength) {
      if (list.length === 0) return EMPTY_BUFFER2;
      if (list.length === 1) return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength) {
        return new FastBuffer(target.buffer, target.byteOffset, offset);
      }
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data)) return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = new FastBuffer(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = __require("bufferutil");
        module.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48) _mask(source, mask, output, offset, length);
          else bufferUtil.mask(source, mask, output, offset, length);
        };
        module.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32) _unmask(buffer, mask);
          else bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/limiter.js"(exports, module) {
    "use strict";
    var kDone = /* @__PURE__ */ Symbol("kDone");
    var kRun = /* @__PURE__ */ Symbol("kRun");
    var Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency) return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module.exports = Limiter;
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/permessage-deflate.js"(exports, module) {
    "use strict";
    var zlib = __require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = /* @__PURE__ */ Symbol("permessage-deflate");
    var kTotalLength = /* @__PURE__ */ Symbol("total-length");
    var kCallback = /* @__PURE__ */ Symbol("callback");
    var kBuffers = /* @__PURE__ */ Symbol("buffers");
    var kError = /* @__PURE__ */ Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate2 = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {Boolean} [options.isServer=false] Create the instance in either
       *     server or client mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       */
      constructor(options) {
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._maxPayload = this._options.maxPayload | 0;
        this._isServer = !!this._options.isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted2 = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && (typeof params.client_max_window_bits === "number" ? opts.clientMaxWindowBits > params.client_max_window_bits : !params.client_max_window_bits)) {
            return false;
          }
          return true;
        });
        if (!accepted2) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted2.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted2.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted2.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted2.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted2.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted2.client_max_window_bits;
        }
        return accepted2;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key2) => {
            let value = params[key2];
            if (value.length > 1) {
              throw new Error(`Parameter "${key2}" must have only a single value`);
            }
            value = value[0];
            if (key2 === "client_max_window_bits") {
              if (value !== true) {
                const num2 = +value;
                if (!Number.isInteger(num2) || num2 < 8 || num2 > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key2}": ${value}`
                  );
                }
                value = num2;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key2}": ${value}`
                );
              }
            } else if (key2 === "server_max_window_bits") {
              const num2 = +value;
              if (!Number.isInteger(num2) || num2 < 8 || num2 > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key2}": ${value}`
                );
              }
              value = num2;
            } else if (key2 === "client_no_context_takeover" || key2 === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key2}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key2}"`);
            }
            params[key2] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key2 = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key2] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key2];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin) this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key2 = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key2] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key2];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module.exports = PerMessageDeflate2;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      if (this[kError]) {
        this[kCallback](this[kError]);
        return;
      }
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/validation.js"(exports, module) {
    "use strict";
    var { isUtf8 } = __require("buffer");
    var { hasBlob } = require_constants();
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    function isBlob(value) {
      return hasBlob && typeof value === "object" && typeof value.arrayBuffer === "function" && typeof value.type === "string" && typeof value.stream === "function" && (value[Symbol.toStringTag] === "Blob" || value[Symbol.toStringTag] === "File");
    }
    module.exports = {
      isBlob,
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8) {
      module.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = __require("utf-8-validate");
        module.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/receiver.js"(exports, module) {
    "use strict";
    var { Writable } = __require("stream");
    var PerMessageDeflate2 = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER: EMPTY_BUFFER2,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var FastBuffer = Buffer[Symbol.species];
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var DEFER_EVENT = 6;
    var Receiver2 = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxBufferedChunks=0] The maximum number of
       *     buffered data chunks
       * @param {Number} [options.maxFragments=0] The maximum number of message
       *     fragments
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super();
        this._allowSynchronousEvents = options.allowSynchronousEvents !== void 0 ? options.allowSynchronousEvents : true;
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxBufferedChunks = options.maxBufferedChunks | 0;
        this._maxFragments = options.maxFragments | 0;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._numFragments = 0;
        this._fragments = [];
        this._errored = false;
        this._loop = false;
        this._state = GET_INFO;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO) return cb();
        if (this._maxBufferedChunks > 0 && this._buffers.length >= this._maxBufferedChunks) {
          cb(
            this.createError(
              RangeError,
              "Too many buffered chunks",
              false,
              1008,
              "WS_ERR_TOO_MANY_BUFFERED_PARTS"
            )
          );
          return;
        }
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length) return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              this.getInfo(cb);
              break;
            case GET_PAYLOAD_LENGTH_16:
              this.getPayloadLength16(cb);
              break;
            case GET_PAYLOAD_LENGTH_64:
              this.getPayloadLength64(cb);
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              this.getData(cb);
              break;
            case INFLATING:
            case DEFER_EVENT:
              this._loop = false;
              return;
          }
        } while (this._loop);
        if (!this._errored) cb();
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @param {Function} cb Callback
       * @private
       */
      getInfo(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          const error = this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
          cb(error);
          return;
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate2.extensionName]) {
          const error = this.createError(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          cb(error);
          return;
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (!this._fragmented) {
            const error = this.createError(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            const error = this.createError(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            const error = this.createError(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
            cb(error);
            return;
          }
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            const error = this.createError(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
            cb(error);
            return;
          }
        } else {
          const error = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          cb(error);
          return;
        }
        if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            const error = this.createError(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
            cb(error);
            return;
          }
        } else if (this._masked) {
          const error = this.createError(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
          cb(error);
          return;
        }
        if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
        else this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength16(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength64(cb) {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num2 = buf.readUInt32BE(0);
        if (num2 > Math.pow(2, 53 - 32) - 1) {
          const error = this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
          cb(error);
          return;
        }
        this._payloadLength = num2 * Math.pow(2, 32) + buf.readUInt32BE(4);
        this.haveLength(cb);
      }
      /**
       * Payload length has been read.
       *
       * @param {Function} cb Callback
       * @private
       */
      haveLength(cb) {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            const error = this.createError(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            cb(error);
            return;
          }
        }
        if (this._masked) this._state = GET_MASK;
        else this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER2;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7) {
          this.controlMessage(data, cb);
          return;
        }
        if (this._maxFragments > 0 && ++this._numFragments > this._maxFragments) {
          const error = this.createError(
            RangeError,
            "Too many message fragments",
            false,
            1008,
            "WS_ERR_TOO_MANY_BUFFERED_PARTS"
          );
          cb(error);
          return;
        }
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        this.dataMessage(cb);
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err) return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              const error = this.createError(
                RangeError,
                "Max payload size exceeded",
                false,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
              cb(error);
              return;
            }
            this._fragments.push(buf);
          }
          this.dataMessage(cb);
          if (this._state === GET_INFO) this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @param {Function} cb Callback
       * @private
       */
      dataMessage(cb) {
        if (!this._fin) {
          this._state = GET_INFO;
          return;
        }
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._numFragments = 0;
        this._fragments = [];
        if (this._opcode === 2) {
          let data;
          if (this._binaryType === "nodebuffer") {
            data = concat(fragments, messageLength);
          } else if (this._binaryType === "arraybuffer") {
            data = toArrayBuffer(concat(fragments, messageLength));
          } else if (this._binaryType === "blob") {
            data = new Blob(fragments);
          } else {
            data = fragments;
          }
          if (this._allowSynchronousEvents) {
            this.emit("message", data, true);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", data, true);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        } else {
          const buf = concat(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            const error = this.createError(
              Error,
              "invalid UTF-8 sequence",
              true,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            cb(error);
            return;
          }
          if (this._state === INFLATING || this._allowSynchronousEvents) {
            this.emit("message", buf, false);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", buf, false);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        }
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data, cb) {
        if (this._opcode === 8) {
          if (data.length === 0) {
            this._loop = false;
            this.emit("conclude", 1005, EMPTY_BUFFER2);
            this.end();
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              const error = this.createError(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
              cb(error);
              return;
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              const error = this.createError(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
              cb(error);
              return;
            }
            this._loop = false;
            this.emit("conclude", code, buf);
            this.end();
          }
          this._state = GET_INFO;
          return;
        }
        if (this._allowSynchronousEvents) {
          this.emit(this._opcode === 9 ? "ping" : "pong", data);
          this._state = GET_INFO;
        } else {
          this._state = DEFER_EVENT;
          setImmediate(() => {
            this.emit(this._opcode === 9 ? "ping" : "pong", data);
            this._state = GET_INFO;
            this.startLoop(cb);
          });
        }
      }
      /**
       * Builds an error object.
       *
       * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
       * @param {String} message The error message
       * @param {Boolean} prefix Specifies whether or not to add a default prefix to
       *     `message`
       * @param {Number} statusCode The status code
       * @param {String} errorCode The exposed error code
       * @return {(Error|RangeError)} The error
       * @private
       */
      createError(ErrorCtor, message, prefix, statusCode, errorCode) {
        this._loop = false;
        this._errored = true;
        const err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        Error.captureStackTrace(err, this.createError);
        err.code = errorCode;
        err[kStatusCode] = statusCode;
        return err;
      }
    };
    module.exports = Receiver2;
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/sender.js"(exports, module) {
    "use strict";
    var { Duplex } = __require("stream");
    var { randomFillSync } = __require("crypto");
    var {
      types: { isUint8Array }
    } = __require("util");
    var PerMessageDeflate2 = require_permessage_deflate();
    var { EMPTY_BUFFER: EMPTY_BUFFER2, kWebSocket, NOOP } = require_constants();
    var { isBlob, isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = /* @__PURE__ */ Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var RANDOM_POOL_SIZE = 8 * 1024;
    var randomPool;
    var randomPoolPointer = RANDOM_POOL_SIZE;
    var DEFAULT = 0;
    var DEFLATING = 1;
    var GET_BLOB_DATA = 2;
    var Sender2 = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {Duplex} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._queue = [];
        this._state = DEFAULT;
        this.onerror = NOOP;
        this[kWebSocket] = void 0;
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            if (randomPoolPointer === RANDOM_POOL_SIZE) {
              if (randomPool === void 0) {
                randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
              }
              randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
              randomPoolPointer = 0;
            }
            mask[0] = randomPool[randomPoolPointer++];
            mask[1] = randomPool[randomPoolPointer++];
            mask[2] = randomPool[randomPoolPointer++];
            mask[3] = randomPool[randomPoolPointer++];
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1) target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask) return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking) return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER2;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else if (isUint8Array(data)) {
            buf.set(data, 2);
          } else {
            throw new TypeError("Second argument must be a string or a Uint8Array");
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(buf, options), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin) this._firstFragment = true;
        const opts = {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
          } else {
            this.getBlobData(data, this._compress, opts, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      }
      /**
       * Gets the contents of a blob as binary data.
       *
       * @param {Blob} blob The blob
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     the data
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      getBlobData(blob, compress, options, cb) {
        this._bufferedBytes += options[kByteLength];
        this._state = GET_BLOB_DATA;
        blob.arrayBuffer().then((arrayBuffer) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while the blob was being read"
            );
            process.nextTick(callCallbacks, this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          const data = toBuffer(arrayBuffer);
          if (!compress) {
            this._state = DEFAULT;
            this.sendFrame(_Sender.frame(data, options), cb);
            this.dequeue();
          } else {
            this.dispatch(data, compress, options, cb);
          }
        }).catch((err) => {
          process.nextTick(onError, this, err, cb);
        });
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._state = DEFLATING;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            callCallbacks(this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._state = DEFAULT;
          options.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (this._state === DEFAULT && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {(Buffer | String)[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module.exports = Sender2;
    function callCallbacks(sender, err, cb) {
      if (typeof cb === "function") cb(err);
      for (let i = 0; i < sender._queue.length; i++) {
        const params = sender._queue[i];
        const callback = params[params.length - 1];
        if (typeof callback === "function") callback(err);
      }
    }
    function onError(sender, err, cb) {
      callCallbacks(sender, err, cb);
      sender.onerror(err);
    }
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/event-target.js"(exports, module) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = /* @__PURE__ */ Symbol("kCode");
    var kData = /* @__PURE__ */ Symbol("kData");
    var kError = /* @__PURE__ */ Symbol("kError");
    var kMessage = /* @__PURE__ */ Symbol("kMessage");
    var kReason = /* @__PURE__ */ Symbol("kReason");
    var kTarget = /* @__PURE__ */ Symbol("kTarget");
    var kType = /* @__PURE__ */ Symbol("kType");
    var kWasClean = /* @__PURE__ */ Symbol("kWasClean");
    var Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = handler;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/extension.js"(exports, module) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0) dest[name] = [elem];
      else dest[name].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1) start = i;
            else if (!mustUnescape) mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1) start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1) end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension2) => {
        let configurations = extensions[extension2];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations.map((params) => {
          return [extension2].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values)) values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module.exports = { format, parse };
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/websocket.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var https = __require("https");
    var http = __require("http");
    var net = __require("net");
    var tls = __require("tls");
    var { randomBytes: randomBytes5, createHash } = __require("crypto");
    var { Duplex, Readable } = __require("stream");
    var { URL: URL2 } = __require("url");
    var PerMessageDeflate2 = require_permessage_deflate();
    var Receiver2 = require_receiver();
    var Sender2 = require_sender();
    var { isBlob } = require_validation();
    var {
      BINARY_TYPES,
      CLOSE_TIMEOUT,
      EMPTY_BUFFER: EMPTY_BUFFER2,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var kAborted = /* @__PURE__ */ Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket2 = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER2;
        this._closeTimer = null;
        this._errorEmitted = false;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            if (!options || options.protocols === void 0) {
              protocols = [];
            } else if (Array.isArray(options.protocols)) {
              protocols = options.protocols;
            } else {
              protocols = [options.protocols];
            }
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              if (options.protocols === void 0) {
                protocols = [];
              } else if (Array.isArray(options.protocols)) {
                protocols = options.protocols;
              } else {
                protocols = [options.protocols];
              }
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._autoPong = options.autoPong;
          this._closeTimeout = options.closeTimeout;
          this._isServer = true;
        }
      }
      /**
       * For historical reasons, the custom "nodebuffer" type is used by the default
       * instead of "blob".
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type)) return;
        this._binaryType = type;
        if (this._receiver) this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket) return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxBufferedChunks=0] The maximum number of
       *     buffered data chunks
       * @param {Number} [options.maxFragments=0] The maximum number of message
       *     fragments
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options) {
        const receiver = new Receiver2({
          allowSynchronousEvents: options.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxBufferedChunks: options.maxBufferedChunks,
          maxFragments: options.maxFragments,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        const sender = new Sender2(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._sender = sender;
        this._socket = socket;
        receiver[kWebSocket] = this;
        sender[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        sender.onerror = senderOnError;
        if (socket.setTimeout) socket.setTimeout(0);
        if (socket.setNoDelay) socket.setNoDelay();
        if (head.length > 0) socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate2.extensionName]) {
          this._extensions[PerMessageDeflate2.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err) return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        this._readyState = _WebSocket.CLOSING;
        setCloseTimer(this);
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER2, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER2, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain) this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate2.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER2, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket2, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket2.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket2.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function") return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket2.prototype.addEventListener = addEventListener;
    WebSocket2.prototype.removeEventListener = removeEventListener;
    module.exports = WebSocket2;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        allowSynchronousEvents: true,
        autoPong: true,
        closeTimeout: CLOSE_TIMEOUT,
        protocolVersion: protocolVersions[1],
        maxBufferedChunks: 256 * 1024,
        maxFragments: 16 * 1024,
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        protocols: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      websocket._autoPong = opts.autoPong;
      websocket._closeTimeout = opts.closeTimeout;
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL2) {
        parsedUrl = address;
      } else {
        try {
          parsedUrl = new URL2(address);
        } catch {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      }
      if (parsedUrl.protocol === "http:") {
        parsedUrl.protocol = "ws:";
      } else if (parsedUrl.protocol === "https:") {
        parsedUrl.protocol = "wss:";
      }
      websocket._url = parsedUrl.href;
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key2 = randomBytes5(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = opts.createConnection || (isSecure ? tlsConnect : netConnect);
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key2,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate2({
          ...opts.perMessageDeflate,
          isServer: false,
          maxPayload: opts.maxPayload
        });
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate2.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key3, value] of Object.entries(headers)) {
              options.headers[key3.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost) delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted]) return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL2(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket2.CONNECTING) return;
        req = websocket._req = null;
        const upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key2 + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt) websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate2.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate2.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          allowSynchronousEvents: opts.allowSynchronousEvents,
          generateMask: opts.generateMask,
          maxBufferedChunks: opts.maxBufferedChunks,
          maxFragments: opts.maxFragments,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      if (opts.finishRequest) {
        opts.finishRequest(req, websocket);
      } else {
        req.end();
      }
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket2.CLOSING;
      websocket._errorEmitted = true;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket2.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = isBlob(data) ? data.size : toBuffer(data).length;
        if (websocket._socket) websocket._sender._bufferedBytes += length;
        else websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0) return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005) websocket.close();
      else websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused) websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function senderOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket.readyState === WebSocket2.CLOSED) return;
      if (websocket.readyState === WebSocket2.OPEN) {
        websocket._readyState = WebSocket2.CLOSING;
        setCloseTimer(websocket);
      }
      this._socket.end();
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function setCloseTimer(websocket) {
      websocket._closeTimer = setTimeout(
        websocket._socket.destroy.bind(websocket._socket),
        websocket._closeTimeout
      );
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket2.CLOSING;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && this._readableState.length !== 0) {
        const chunk = this.read(this._readableState.length);
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket2.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket2.CLOSING;
        this.destroy();
      }
    }
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/stream.js"(exports, module) {
    "use strict";
    var WebSocket2 = require_websocket();
    var { Duplex } = __require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream2(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data)) ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed) return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed) return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called) callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy) ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null) return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted) duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused) ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module.exports = createWebSocketStream2;
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/subprotocol.js"(exports, module) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1) end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module.exports = { parse };
  }
});

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/.pnpm/ws@8.22.0/node_modules/ws/lib/websocket-server.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var http = __require("http");
    var { Duplex } = __require("stream");
    var { createHash } = __require("crypto");
    var extension2 = require_extension();
    var PerMessageDeflate2 = require_permessage_deflate();
    var subprotocol2 = require_subprotocol();
    var WebSocket2 = require_websocket();
    var { CLOSE_TIMEOUT, GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer2 = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Boolean} [options.autoPong=true] Specifies whether or not to
       *     automatically send a pong in response to a ping
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to
       *     wait for the closing handshake to finish after `websocket.close()` is
       *     called
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxBufferedChunks=262144] The maximum number of
       *     buffered data chunks
       * @param {Number} [options.maxFragments=16384] The maximum number of message
       *     fragments
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          allowSynchronousEvents: true,
          autoPong: true,
          maxBufferedChunks: 256 * 1024,
          maxFragments: 16 * 1024,
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          closeTimeout: CLOSE_TIMEOUT,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket2,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true) options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server) return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb) this.once("close", cb);
        if (this._state === CLOSING) return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path) return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key2 = req.headers["sec-websocket-key"];
        const upgrade = req.headers.upgrade;
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (key2 === void 0 || !keyRegex.test(key2)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 13 && version !== 8) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
            "Sec-WebSocket-Version": "13, 8"
          });
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol2.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate2({
            ...this.options.perMessageDeflate,
            isServer: true,
            maxPayload: this.options.maxPayload
          });
          try {
            const offers = extension2.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate2.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate2.extensionName]);
              extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key2,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key2, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key2, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable) return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING) return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key2 + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null, void 0, this.options);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate2.extensionName]) {
          const params = extensions[PerMessageDeflate2.extensionName].params;
          const value = extension2.format({
            [PerMessageDeflate2.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxBufferedChunks: this.options.maxBufferedChunks,
          maxFragments: this.options.maxFragments,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module.exports = WebSocketServer2;
    function addListeners(server, map) {
      for (const event of Object.keys(map)) server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message, headers) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message, headers);
      }
    }
  }
});

// extension/src/index.ts
import { randomBytes as randomBytes4 } from "node:crypto";

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/is-message.js
function isMessage(arg, schema) {
  const isMessage2 = arg !== null && typeof arg == "object" && "$typeName" in arg && typeof arg.$typeName == "string";
  if (!isMessage2) {
    return false;
  }
  if (schema === void 0) {
    return true;
  }
  return schema.typeName === arg.$typeName;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
var ScalarType;
(function(ScalarType2) {
  ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
  ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
  ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
  ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
  ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
  ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
  ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
  ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
  ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
  ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
  ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
  ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
  ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
  ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
  ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
function varint64read() {
  const buf = this.buf;
  let pos = this.pos;
  let lo = 0;
  let hi = 0;
  for (let shift = 0; shift < 28; shift += 7) {
    const b = buf[pos++];
    lo |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.pos = pos;
      this.assertBounds();
      this.varint64Lo = lo;
      this.varint64Hi = hi;
      return;
    }
  }
  const middleByte = buf[pos++];
  lo |= (middleByte & 15) << 28;
  hi = (middleByte & 112) >> 4;
  if ((middleByte & 128) == 0) {
    this.pos = pos;
    this.assertBounds();
    this.varint64Lo = lo;
    this.varint64Hi = hi;
    return;
  }
  for (let shift = 3; shift <= 31; shift += 7) {
    const b = buf[pos++];
    hi |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.pos = pos;
      this.assertBounds();
      this.varint64Lo = lo;
      this.varint64Hi = hi;
      return;
    }
  }
  throw new Error("invalid varint");
}
var TWO_PWR_32_DBL = 4294967296;
function int64FromString(dec) {
  const minus = dec[0] === "-";
  if (minus) {
    dec = dec.slice(1);
  }
  const base = 1e6;
  let lowBits = 0;
  let highBits = 0;
  function add1e6digit(begin, end) {
    const digit1e6 = Number(dec.slice(begin, end));
    highBits *= base;
    lowBits = lowBits * base + digit1e6;
    if (lowBits >= TWO_PWR_32_DBL) {
      highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
      lowBits = lowBits % TWO_PWR_32_DBL;
    }
  }
  add1e6digit(-24, -18);
  add1e6digit(-18, -12);
  add1e6digit(-12, -6);
  add1e6digit(-6);
  return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
function int64ToString(lo, hi) {
  let bits = newBits(lo, hi);
  const negative = bits.hi & 2147483648;
  if (negative) {
    bits = negate(bits.lo, bits.hi);
  }
  const result = uInt64ToString(bits.lo, bits.hi);
  return negative ? "-" + result : result;
}
function uInt64ToString(lo, hi) {
  ({ lo, hi } = toUnsigned(lo, hi));
  if (hi <= 2097151) {
    return String(TWO_PWR_32_DBL * hi + lo);
  }
  const low = lo & 16777215;
  const mid = (lo >>> 24 | hi << 8) & 16777215;
  const high = hi >> 16 & 65535;
  let digitA = low + mid * 6777216 + high * 6710656;
  let digitB = mid + high * 8147497;
  let digitC = high * 2;
  const base = 1e7;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }
  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }
  return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
  return { lo: lo >>> 0, hi: hi >>> 0 };
}
function newBits(lo, hi) {
  return { lo: lo | 0, hi: hi | 0 };
}
function negate(lowBits, highBits) {
  highBits = ~highBits;
  if (lowBits) {
    lowBits = ~lowBits + 1;
  } else {
    highBits += 1;
  }
  return newBits(lowBits, highBits);
}
var decimalFrom1e7WithLeadingZeros = (digit1e7) => {
  const partial = String(digit1e7);
  return "0000000".slice(partial.length) + partial;
};
function varint32write(value, bytes) {
  if (value >>> 0 < 128) {
    bytes.push(value);
    return;
  }
  if (value >= 0) {
    while (value > 127) {
      bytes.push(value & 127 | 128);
      value = value >>> 7;
    }
    bytes.push(value);
  } else {
    for (let i = 0; i < 9; i++) {
      bytes.push(value & 127 | 128);
      value = value >> 7;
    }
    bytes.push(1);
  }
}
function varint32read() {
  let b = this.buf[this.pos++];
  if ((b & 128) === 0) {
    this.assertBounds();
    return b;
  }
  let result = b & 127;
  b = this.buf[this.pos++];
  result |= (b & 127) << 7;
  if ((b & 128) === 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 14;
  if ((b & 128) === 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 21;
  if ((b & 128) === 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 15) << 28;
  for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++)
    b = this.buf[this.pos++];
  if ((b & 128) !== 0)
    throw new Error("invalid varint");
  this.assertBounds();
  return result >>> 0;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
var protoInt64 = /* @__PURE__ */ makeInt64Support();
function makeInt64Support() {
  const dv = new DataView(new ArrayBuffer(8));
  const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (!!globalThis.Deno || !!globalThis.Bun || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1");
  if (ok) {
    const MIN = BigInt("-9223372036854775808");
    const MAX = BigInt("9223372036854775807");
    const UMIN = BigInt("0");
    const UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > MAX || bi < MIN) {
          throw new Error(`invalid int64: ${value}`);
        }
        return bi;
      },
      uParse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > UMAX || bi < UMIN) {
          throw new Error(`invalid uint64: ${value}`);
        }
        return bi;
      },
      enc(value) {
        dv.setBigInt64(0, this.parse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      uEnc(value) {
        dv.setBigInt64(0, this.uParse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      dec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigInt64(0, true);
      },
      uDec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigUint64(0, true);
      }
    };
  }
  return {
    zero: "0",
    supported: false,
    parse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return value;
    },
    uParse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return value;
    },
    enc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return int64FromString(value);
    },
    uEnc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return int64FromString(value);
    },
    dec(lo, hi) {
      return int64ToString(lo, hi);
    },
    uDec(lo, hi) {
      return uInt64ToString(lo, hi);
    }
  };
}
function assertInt64String(value) {
  if (!/^-?[0-9]+$/.test(value)) {
    throw new Error("invalid int64: " + value);
  }
}
function assertUInt64String(value) {
  if (!/^[0-9]+$/.test(value)) {
    throw new Error("invalid uint64: " + value);
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
function scalarZeroValue(type, longAsString) {
  switch (type) {
    case ScalarType.STRING:
      return "";
    case ScalarType.BOOL:
      return false;
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0;
    case ScalarType.INT64:
    case ScalarType.UINT64:
    case ScalarType.SFIXED64:
    case ScalarType.FIXED64:
    case ScalarType.SINT64:
      return longAsString ? "0" : protoInt64.zero;
    case ScalarType.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
function unsafeIsSetExplicit(target, localName) {
  return Object.prototype.hasOwnProperty.call(target, localName) && target[localName] !== void 0;
}
function setOwn(obj, key2, value) {
  if (key2 === "__proto__") {
    Object.defineProperty(obj, "__proto__", {
      value,
      writable: true,
      enumerable: true,
      configurable: true
    });
  } else {
    obj[key2] = value;
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
function isObject(arg) {
  return arg !== null && typeof arg == "object" && !Array.isArray(arg);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
function isWrapperDesc(messageDesc2) {
  const f = messageDesc2.fields[0];
  return isWrapperTypeName(messageDesc2.typeName) && f !== void 0 && f.fieldKind == "scalar" && f.name == "value" && f.number == 1;
}
var wrapperTypeNames = /* @__PURE__ */ new Set([
  "google.protobuf.DoubleValue",
  "google.protobuf.FloatValue",
  "google.protobuf.Int64Value",
  "google.protobuf.UInt64Value",
  "google.protobuf.Int32Value",
  "google.protobuf.UInt32Value",
  "google.protobuf.BoolValue",
  "google.protobuf.StringValue",
  "google.protobuf.BytesValue"
]);
function isWrapperTypeName(name) {
  return wrapperTypeNames.has(name);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/create.js
var EDITION_PROTO3 = 999;
var EDITION_PROTO2 = 998;
var IMPLICIT = 2;
function create(schema, init) {
  if (isMessage(init, schema)) {
    return init;
  }
  return compiledCreate(schema)(init);
}
var compiledCreates = /* @__PURE__ */ new WeakMap();
function compiledCreate(desc) {
  let compiled = compiledCreates.get(desc);
  if (compiled === void 0) {
    compiled = compileCreate(desc);
    compiledCreates.set(desc, compiled);
  }
  return compiled;
}
var INIT_SINGULAR = 0;
var INIT_LIST = 1;
var INIT_MAP = 2;
var INIT_ONEOF = 3;
function compileCreate(desc) {
  const typeName = desc.typeName;
  const { properties, prototype } = compileInitMessage(desc);
  return (init) => {
    let message;
    if (prototype !== void 0) {
      message = Object.create(prototype);
      message.$typeName = typeName;
    } else {
      message = { $typeName: typeName };
    }
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const name = property.name;
      const initValue = init === null || init === void 0 ? void 0 : init[name];
      switch (property.kind) {
        case INIT_SINGULAR:
          if (initValue != null) {
            message[name] = property.convert !== void 0 ? property.convert(initValue) : initValue;
          } else if (property.constant !== void 0) {
            message[name] = property.constant;
          }
          break;
        case INIT_LIST:
          message[name] = property.convert !== void 0 && Array.isArray(initValue) ? initValue.map(property.convert) : initValue !== null && initValue !== void 0 ? initValue : [];
          break;
        case INIT_MAP:
          if (property.convert === void 0 || !isObject(initValue)) {
            message[name] = initValue !== null && initValue !== void 0 ? initValue : {};
          } else {
            const converted2 = {};
            const keys = Object.keys(initValue);
            for (let k = 0; k < keys.length; k++) {
              setOwn(converted2, keys[k], property.convert(initValue[keys[k]]));
            }
            message[name] = converted2;
          }
          break;
        case INIT_ONEOF: {
          const oneofValue = initValue;
          if ((oneofValue === null || oneofValue === void 0 ? void 0 : oneofValue.case) != null) {
            const convert = property.convert.get(oneofValue.case);
            if (convert !== void 0) {
              message[name] = {
                case: oneofValue.case,
                value: convert(oneofValue.value)
              };
              break;
            }
          }
          message[name] = { case: void 0 };
          break;
        }
      }
    }
    return message;
  };
}
function compileInitMessage(desc) {
  var _a, _b;
  const properties = [];
  const prototype = {};
  const usePrototype = needsPrototypeChain(desc);
  for (const member of desc.members) {
    const name = member.localName;
    if (member.kind == "oneof") {
      properties.push({
        name,
        kind: INIT_ONEOF,
        constant: void 0,
        convert: compileConvertOneof(member)
      });
      continue;
    }
    switch (member.fieldKind) {
      case "message": {
        properties.push({
          name,
          kind: INIT_SINGULAR,
          constant: void 0,
          convert: compileConvertMessage(member)
        });
        break;
      }
      case "list": {
        properties.push({
          name,
          kind: INIT_LIST,
          constant: void 0,
          convert: member.listKind == "message" ? (_a = compileConvertMessage(member)) !== null && _a !== void 0 ? _a : ((value) => value) : member.scalar == ScalarType.BYTES ? toU8Arr : void 0
        });
        break;
      }
      case "map": {
        properties.push({
          name,
          kind: INIT_MAP,
          constant: void 0,
          convert: member.mapKind == "message" ? (_b = compileConvertMessage(member)) !== null && _b !== void 0 ? _b : ((value) => value) : member.scalar == ScalarType.BYTES ? toU8Arr : void 0
        });
        break;
      }
      default: {
        const zeroValue = createZeroValue(member);
        properties.push({
          name,
          kind: INIT_SINGULAR,
          constant: member.presence == IMPLICIT ? zeroValue : void 0,
          convert: member.fieldKind == "scalar" && member.scalar == ScalarType.BYTES ? toU8Arr : void 0
        });
        if (usePrototype) {
          prototype[name] = zeroValue;
        }
        break;
      }
    }
  }
  return {
    properties,
    prototype: usePrototype ? prototype : void 0
  };
}
function compileConvertOneof(oneof) {
  const converters = /* @__PURE__ */ new Map();
  for (const field of oneof.fields) {
    let convert;
    if (field.fieldKind == "message") {
      convert = compileConvertMessage(field);
    } else if (field.fieldKind == "scalar" && field.scalar == ScalarType.BYTES) {
      convert = toU8Arr;
    }
    converters.set(field.localName, convert !== null && convert !== void 0 ? convert : ((value) => value));
  }
  return converters;
}
function compileConvertMessage(field) {
  if (field.fieldKind == "message" && !field.oneof && isWrapperDesc(field.message)) {
    return field.message.fields[0].scalar == ScalarType.BYTES ? toU8Arr : void 0;
  }
  if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName !== "google.protobuf.Value") {
    return void 0;
  }
  const messageDesc2 = field.message;
  let compiled;
  return (value) => {
    if (!isObject(value) || isMessage(value, messageDesc2)) {
      return value;
    }
    compiled !== null && compiled !== void 0 ? compiled : compiled = compiledCreate(messageDesc2);
    return compiled(value);
  };
}
function toU8Arr(value) {
  return Array.isArray(value) ? new Uint8Array(value) : value;
}
function needsPrototypeChain(desc) {
  switch (desc.file.edition) {
    case EDITION_PROTO3:
      return false;
    case EDITION_PROTO2:
      return true;
    default:
      return desc.fields.some((f) => f.presence != IMPLICIT && f.fieldKind != "message" && !f.oneof);
  }
}
function createZeroValue(field) {
  const defaultValue = field.getDefaultValue();
  if (defaultValue !== void 0) {
    return field.fieldKind == "scalar" && field.longAsString ? defaultValue.toString() : defaultValue;
  }
  return field.fieldKind == "scalar" ? scalarZeroValue(field.scalar, field.longAsString) : field.enum.values[0].number;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
var FieldError = class extends Error {
  constructor(fieldOrOneof, message, name = "FieldValueInvalidError") {
    super(message);
    this.name = name;
    this.field = () => fieldOrOneof;
  }
};

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var te;
function configureTextEncoding(textEncoding) {
  var _a;
  te = Object.assign(Object.assign({}, textEncoding), { encodeUtf8Into: (_a = textEncoding.encodeUtf8Into) !== null && _a !== void 0 ? _a : emulateEncodeInto(textEncoding.encodeUtf8.bind(textEncoding)) });
}
function getTextEncoding() {
  if (!te) {
    const globals = globalThis;
    if (!globals.TextEncoder || !globals.TextDecoder) {
      throw new Error("encoding API missing: install TextEncoder and TextDecoder on globalThis");
    }
    const textEncoder = new globals.TextEncoder();
    const textDecoder = new globals.TextDecoder();
    let textDecoderStrict;
    const config = {
      encodeUtf8(text) {
        return textEncoder.encode(text);
      },
      decodeUtf8(bytes, strict) {
        if (strict) {
          if (!textDecoderStrict) {
            textDecoderStrict = new globals.TextDecoder("utf-8", {
              fatal: true
            });
          }
          return textDecoderStrict.decode(bytes);
        }
        return textDecoder.decode(bytes);
      },
      checkUtf8(text) {
        try {
          encodeURIComponent(text);
          return true;
        } catch (_) {
          return false;
        }
      }
    };
    if (textEncoder.encodeInto) {
      config.encodeUtf8Into = textEncoder.encodeInto.bind(textEncoder);
    }
    const nativeStringIsWellFormed = String.prototype.isWellFormed;
    if (nativeStringIsWellFormed) {
      config.checkUtf8 = (text) => {
        return nativeStringIsWellFormed.call(text);
      };
    }
    configureTextEncoding(config);
  }
  return te;
}
function emulateEncodeInto(encodeUtf8) {
  return (text, dest) => {
    const bytes = encodeUtf8(text);
    dest.set(bytes);
    return { written: bytes.byteLength };
  };
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
var WireType;
(function(WireType2) {
  WireType2[WireType2["Varint"] = 0] = "Varint";
  WireType2[WireType2["Bit64"] = 1] = "Bit64";
  WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
  WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
  WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
  WireType2[WireType2["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
var UINT32_MAX = 4294967295;
var INT32_MAX = 2147483647;
var INT32_MIN = -2147483648;
var BinaryWriter = class {
  constructor(encodeUtf8) {
    this.stackPos = [];
    this.encodeUtf8Into = encodeUtf8 ? emulateEncodeInto(encodeUtf8) : getTextEncoding().encodeUtf8Into;
    this.buffer = EMPTY_BUFFER;
    this.viewCache = EMPTY_VIEW;
    this.pos = 0;
  }
  ensureCapacity(size) {
    const required = this.pos + size;
    if (required > this.buffer.length) {
      let newLen = this.buffer.length || INITIAL_SIZE;
      while (newLen < required)
        newLen *= 2;
      const newBuf = new Uint8Array(newLen);
      if (this.pos > 0)
        newBuf.set(this.buffer);
      this.buffer = newBuf;
    }
  }
  /**
   * The DataView over `buffer`, rebuilt only if the buffer has grown since it
   * was last used.
   */
  view() {
    const bytes = this.buffer;
    const view = this.viewCache;
    if (view.byteLength === bytes.byteLength)
      return view;
    const newView = new DataView(bytes.buffer);
    this.viewCache = newView;
    return newView;
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    const result = this.buffer.slice(0, this.pos);
    this.pos = 0;
    this.stackPos = [];
    return result;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    this.stackPos.push(this.pos);
    this.ensureCapacity(DEFAULT_LEN_PREFIX_SIZE);
    this.buffer[this.pos++] = 0;
    return this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    const forkPos = this.stackPos.pop();
    if (forkPos === void 0)
      throw new Error("invalid state, fork stack empty");
    const len = this.pos - forkPos - DEFAULT_LEN_PREFIX_SIZE;
    const lenPrefixSize = varint32Size(len);
    if (lenPrefixSize > DEFAULT_LEN_PREFIX_SIZE) {
      this.ensureCapacity(lenPrefixSize - DEFAULT_LEN_PREFIX_SIZE);
      this.buffer.copyWithin(forkPos + lenPrefixSize, forkPos + DEFAULT_LEN_PREFIX_SIZE, this.pos);
    }
    this.pos = forkPos;
    this.uint32(len);
    this.pos += len;
    return this;
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo, type) {
    return this.uint32((fieldNo << 3 | type) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk) {
    this.ensureCapacity(chunk.length);
    this.buffer.set(chunk, this.pos);
    this.pos += chunk.length;
    return this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value) {
    assertUInt32(value);
    this.ensureCapacity(5);
    if (value < 128) {
      this.buffer[this.pos++] = value;
      return this;
    }
    while (value > 127) {
      this.buffer[this.pos++] = value & 127 | 128;
      value >>>= 7;
    }
    this.buffer[this.pos++] = value;
    return this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value) {
    assertInt32(value);
    if (value >= 0) {
      return this.uint32(value);
    }
    this.ensureCapacity(10);
    for (let i = 0; i < 9; i++) {
      this.buffer[this.pos++] = value & 127 | 128;
      value >>= 7;
    }
    this.buffer[this.pos++] = 1;
    return this;
  }
  /**
   * Write a `bool` value, a varint.
   */
  bool(value) {
    this.ensureCapacity(1);
    this.buffer[this.pos++] = value ? 1 : 0;
    return this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value) {
    this.uint32(value.byteLength);
    return this.raw(value);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value) {
    if (typeof value !== "string") {
      value = String(value);
    }
    const len = value.length;
    if (len <= ASCII_MAX_LENGTH) {
      this.ensureCapacity(len + 1);
      const ascii = this.buffer;
      let pos = this.pos;
      ascii[pos++] = len;
      let i = 0;
      for (; i < len; i++) {
        const code = value.charCodeAt(i);
        if (code > 127)
          break;
        ascii[pos++] = code;
      }
      if (i == len) {
        this.pos = pos;
        return this;
      }
    }
    this.ensureCapacity(len * 3 + 5);
    const lenPrefixSizeGuess = varint32Size(len);
    const buf = this.buffer;
    const start = this.pos;
    const { written } = this.encodeUtf8Into(value, buf.subarray(start + lenPrefixSizeGuess));
    const lenPrefixSize = varint32Size(written);
    if (lenPrefixSize != lenPrefixSizeGuess) {
      buf.copyWithin(start + lenPrefixSize, start + lenPrefixSizeGuess, start + lenPrefixSizeGuess + written);
    }
    this.uint32(written);
    this.pos += written;
    return this;
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value) {
    assertFloat32(value);
    this.ensureCapacity(4);
    this.view().setFloat32(this.pos, value, true);
    this.pos += 4;
    return this;
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value) {
    this.ensureCapacity(8);
    this.view().setFloat64(this.pos, value, true);
    this.pos += 8;
    return this;
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value) {
    assertUInt32(value);
    this.ensureCapacity(4);
    this.view().setUint32(this.pos, value, true);
    this.pos += 4;
    return this;
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value) {
    assertInt32(value);
    this.ensureCapacity(4);
    this.view().setInt32(this.pos, value, true);
    this.pos += 4;
    return this;
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value) {
    assertInt32(value);
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
  }
  /**
   * Write a `sfixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value) {
    const tc = protoInt64.enc(value);
    this.ensureCapacity(8);
    const view = this.view();
    view.setInt32(this.pos, tc.lo, true);
    view.setInt32(this.pos + 4, tc.hi, true);
    this.pos += 8;
    return this;
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value) {
    const tc = protoInt64.uEnc(value);
    this.ensureCapacity(8);
    const view = this.view();
    view.setInt32(this.pos, tc.lo, true);
    view.setInt32(this.pos + 4, tc.hi, true);
    this.pos += 8;
    return this;
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value) {
    const tc = protoInt64.enc(value);
    return this.writeVarint64(tc.lo, tc.hi);
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value) {
    const tc = protoInt64.enc(value), sign2 = tc.hi >> 31, lo = tc.lo << 1 ^ sign2, hi = (tc.hi << 1 | tc.lo >>> 31) ^ sign2;
    return this.writeVarint64(lo, hi);
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value) {
    const tc = protoInt64.uEnc(value);
    return this.writeVarint64(tc.lo, tc.hi);
  }
  /**
   * Write a 64-bit varint directly into the buffer. Accepts the value as
   * split low/high 32-bit words.
   *
   * Ported from varint64write() to avoid the intermediate number[] buffer.
   * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
   */
  writeVarint64(lo, hi) {
    this.ensureCapacity(10);
    const buf = this.buffer;
    let pos = this.pos;
    for (let i = 0; i < 28; i = i + 7) {
      const shift = lo >>> i;
      const hasNext = !(shift >>> 7 == 0 && hi == 0);
      buf[pos++] = (hasNext ? shift | 128 : shift) & 255;
      if (!hasNext) {
        this.pos = pos;
        return this;
      }
    }
    const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
    const hasMoreBits = !(hi >> 3 == 0);
    buf[pos++] = (hasMoreBits ? splitBits | 128 : splitBits) & 255;
    if (!hasMoreBits) {
      this.pos = pos;
      return this;
    }
    for (let i = 3; i < 31; i = i + 7) {
      const shift = hi >>> i;
      const hasNext = !(shift >>> 7 == 0);
      buf[pos++] = (hasNext ? shift | 128 : shift) & 255;
      if (!hasNext) {
        this.pos = pos;
        return this;
      }
    }
    buf[pos++] = hi >>> 31 & 1;
    this.pos = pos;
    return this;
  }
};
var INITIAL_SIZE = 128;
var DEFAULT_LEN_PREFIX_SIZE = 1;
var EMPTY_BUFFER = new Uint8Array(0);
var EMPTY_VIEW = new DataView(EMPTY_BUFFER.buffer);
var ASCII_MAX_LENGTH = 32;
function varint32Size(value) {
  if (value < 128)
    return 1;
  if (value < 16384)
    return 2;
  if (value < 2097152)
    return 3;
  if (value < 268435456)
    return 4;
  return 5;
}
var BinaryReader = class {
  constructor(buf, decodeUtf8 = getTextEncoding().decodeUtf8) {
    this.decodeUtf8 = decodeUtf8;
    this.varint64Lo = 0;
    this.varint64Hi = 0;
    this.varint64 = varint64read;
    this.uint32 = varint32read;
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  /**
   * Reads a tag - field number and wire type. Tags are uint32 varints; values
   * that do not fit in uint32 are rejected.
   */
  tag() {
    const start = this.pos;
    const tag = this.uint32();
    const bytesRead = this.pos - start;
    if (bytesRead > 5 || bytesRead == 5 && this.buf[this.pos - 1] > 15) {
      throw new Error("illegal tag: varint overflows uint32");
    }
    const fieldNo = tag >>> 3;
    const wireType = tag & 7;
    if (fieldNo <= 0 || wireType > 5) {
      throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
    }
    return [fieldNo, wireType];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag. Recursion into nested groups
   * is guarded by the `recursionLimit` argument: When the limit is reached,
   * this method throws.
   */
  skip(wireType, fieldNo, recursionLimit = 100) {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 128) {
        }
        break;
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case WireType.Bit64:
        this.pos += 4;
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        if (recursionLimit <= 0) {
          throw new Error("maximum recursion depth reached");
        }
        for (; ; ) {
          const [fn, wt] = this.tag();
          if (wt === WireType.EndGroup) {
            if (fieldNo !== void 0 && fn !== fieldNo) {
              throw new Error("invalid end group tag");
            }
            break;
          }
          this.skip(wt, fn, recursionLimit - 1);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let zze = this.uint32();
    return zze >>> 1 ^ -(zze & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    this.varint64();
    return protoInt64.dec(this.varint64Lo, this.varint64Hi);
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    this.varint64();
    return protoInt64.uDec(this.varint64Lo, this.varint64Hi);
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    this.varint64();
    let lo = this.varint64Lo;
    let hi = this.varint64Hi;
    let s = -(lo & 1);
    lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
    hi = hi >>> 1 ^ s;
    return protoInt64.dec(lo, hi);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    const b = this.buf[this.pos];
    if (b < 128) {
      this.pos++;
      return b !== 0;
    }
    this.varint64();
    return this.varint64Lo !== 0 || this.varint64Hi !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let len = this.uint32(), start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text. If
   * `strict` is true, throw on invalid UTF-8 instead of substituting U+FFFD.
   */
  string(strict) {
    const bytes = this.bytes();
    const len = bytes.length;
    if (len <= ASCII_MAX_LENGTH) {
      const codes = new Array(len);
      for (let i = 0; i < len; i++) {
        const byte = bytes[i];
        if (byte > 127) {
          return this.decodeUtf8(bytes, strict);
        }
        codes[i] = byte;
      }
      return String.fromCharCode.apply(String, codes);
    }
    return this.decodeUtf8(bytes, strict);
  }
};
function assertInt32(arg) {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid int32: " + typeof arg);
  }
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
    throw new Error("invalid int32: " + arg);
}
function assertUInt32(arg) {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid uint32: " + typeof arg);
  }
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
    throw new Error("invalid uint32: " + arg);
}
function assertFloat32(arg) {
  if (typeof arg == "string") {
    const o = arg;
    arg = Number(arg);
    if (Number.isNaN(arg) && o !== "NaN") {
      throw new Error("invalid float32: " + o);
    }
  } else if (typeof arg != "number") {
    throw new Error("invalid float32: " + typeof arg);
  }
  if (!Number.isFinite(Math.fround(arg)) && Number.isFinite(arg)) {
    throw new Error("invalid float32: " + arg);
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/reflect/message.js
var NULL_VALUE = 0;
function localMessageMapper(field) {
  if (usesJsonRepresentation(field)) {
    return {
      toMessage: (local) => wktStructToReflect(local),
      toLocal: (message) => wktStructToLocal(message)
    };
  }
  if (field.fieldKind == "message" && !field.oneof && isWrapperDesc(field.message)) {
    const wrapperDesc = field.message;
    const valueLocalName = wrapperDesc.fields[0].localName;
    return {
      toMessage: (local) => {
        const message = create(wrapperDesc);
        if (local !== void 0) {
          message[valueLocalName] = local;
        }
        return message;
      },
      toLocal: (message) => message[valueLocalName]
    };
  }
  const childDesc = field.message;
  return {
    toMessage: (local) => local === void 0 ? create(childDesc) : local,
    toLocal: (message) => message
  };
}
function usesJsonRepresentation(field) {
  return field.message.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value";
}
function wktStructToReflect(json) {
  const struct = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (isObject(json)) {
    for (const k of Object.keys(json)) {
      setOwn(struct.fields, k, wktValueToReflect(json[k]));
    }
  }
  return struct;
}
function wktStructToLocal(val) {
  const json = {};
  for (const k of Object.keys(val.fields)) {
    setOwn(json, k, wktValueToLocal(val.fields[k]));
  }
  return json;
}
function wktValueToLocal(val) {
  switch (val.kind.case) {
    case "structValue":
      return wktStructToLocal(val.kind.value);
    case "listValue":
      return val.kind.value.values.map(wktValueToLocal);
    case "nullValue":
    case void 0:
      return null;
    default:
      return val.kind.value;
  }
}
function wktValueToReflect(json) {
  const value = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof json) {
    case "number":
      value.kind = { case: "numberValue", value: json };
      break;
    case "string":
      value.kind = { case: "stringValue", value: json };
      break;
    case "boolean":
      value.kind = { case: "boolValue", value: json };
      break;
    case "object":
      if (json === null) {
        value.kind = { case: "nullValue", value: NULL_VALUE };
      } else if (Array.isArray(json)) {
        const listValue = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(json)) {
          for (const e of json) {
            listValue.values.push(wktValueToReflect(e));
          }
        }
        value.kind = {
          case: "listValue",
          value: listValue
        };
      } else {
        value.kind = {
          case: "structValue",
          value: wktStructToReflect(json)
        };
      }
      break;
  }
  return value;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
var nativeSetFromBase64 = Uint8Array.prototype.setFromBase64;
function base64Decode(base64Str) {
  const len = base64Str.length;
  let size = len - (len + 3 >> 2);
  if ((len & 3) == 0 && base64Str[len - 1] == "=") {
    size -= base64Str[len - 2] == "=" ? 2 : 1;
  }
  const bytes = new Uint8Array(size);
  let written = -1;
  if (nativeSetFromBase64) {
    try {
      const result = nativeSetFromBase64.call(bytes, base64Str);
      if (result.read == len) {
        written = result.written;
      }
    } catch (_a) {
    }
  }
  if (written < 0) {
    written = setFromBase64(bytes, base64Str);
  }
  return written == size ? bytes : bytes.subarray(0, written);
}
function setFromBase64(bytes, base64Str) {
  const table = getDecodeTable();
  let bytePos = 0, groupPos = 0, b, p = 0;
  for (let i = 0; i < base64Str.length; i++) {
    b = table[base64Str.charCodeAt(i)];
    if (b === void 0) {
      switch (base64Str[i]) {
        // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
        case "=":
          groupPos = 0;
        // reset state when padding found
        case "\n":
        case "\r":
        case "	":
        case " ":
          continue;
        // skip white-space, and padding
        default:
          throw Error("invalid base64 string");
      }
    }
    switch (groupPos) {
      case 0:
        p = b;
        groupPos = 1;
        break;
      case 1:
        bytes[bytePos++] = p << 2 | (b & 48) >> 4;
        p = b;
        groupPos = 2;
        break;
      case 2:
        bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
        p = b;
        groupPos = 3;
        break;
      case 3:
        bytes[bytePos++] = (p & 3) << 6 | b;
        groupPos = 0;
        break;
    }
  }
  if (groupPos == 1)
    throw Error("invalid base64 string");
  return bytePos;
}
var nativeToBase64 = Uint8Array.prototype.toBase64;
var encodeTableStd;
var encodeTableUrl;
var decodeTable;
function getEncodeTable(encoding) {
  if (!encodeTableStd) {
    encodeTableStd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    encodeTableUrl = encodeTableStd.slice(0, -2).concat("-", "_");
  }
  return encoding == "url" ? (
    // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
    encodeTableUrl
  ) : encodeTableStd;
}
function getDecodeTable() {
  if (!decodeTable) {
    decodeTable = [];
    const encodeTable = getEncodeTable("std");
    for (let i = 0; i < encodeTable.length; i++)
      decodeTable[encodeTable[i].charCodeAt(0)] = i;
    decodeTable["-".charCodeAt(0)] = encodeTable.indexOf("+");
    decodeTable["_".charCodeAt(0)] = encodeTable.indexOf("/");
  }
  return decodeTable;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
function protoCamelCase(snakeCase) {
  let capNext = false;
  const b = [];
  for (let i = 0; i < snakeCase.length; i++) {
    let c = snakeCase.charAt(i);
    switch (c) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        b.push(c);
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c = c.toUpperCase();
        }
        b.push(c);
        break;
    }
  }
  return b.join("");
}
var reservedObjectProperties = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function safeObjectProperty(name) {
  return reservedObjectProperties.has(name) ? name + "$" : name;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/restore-json-names.js
function restoreJsonNames(message) {
  for (const f of message.field) {
    if (!unsafeIsSetExplicit(f, "jsonName")) {
      f.jsonName = protoCamelCase(f.name);
    }
  }
  message.nestedType.forEach(restoreJsonNames);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
function parseTextFormatEnumValue(descEnum, value) {
  const enumValue = descEnum.values.find((v) => v.name === value);
  if (!enumValue) {
    throw new Error(`cannot parse ${descEnum} default value: ${value}`);
  }
  return enumValue.number;
}
function parseTextFormatScalarValue(type, value) {
  switch (type) {
    case ScalarType.STRING:
      return value;
    case ScalarType.BYTES: {
      const u = unescapeBytesDefaultValue(value);
      if (u === false) {
        throw new Error(`cannot parse ${ScalarType[type]} default value: ${value}`);
      }
      return u;
    }
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return protoInt64.parse(value);
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return protoInt64.uParse(value);
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      switch (value) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(value);
      }
    case ScalarType.BOOL:
      return value === "true";
    case ScalarType.INT32:
    case ScalarType.UINT32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
      return parseInt(value, 10);
  }
}
function unescapeBytesDefaultValue(str) {
  const b = [];
  const input = {
    tail: str,
    c: "",
    next() {
      if (this.tail.length == 0) {
        return false;
      }
      this.c = this.tail[0];
      this.tail = this.tail.substring(1);
      return true;
    },
    take(n) {
      if (this.tail.length >= n) {
        const r = this.tail.substring(0, n);
        this.tail = this.tail.substring(n);
        return r;
      }
      return false;
    }
  };
  while (input.next()) {
    switch (input.c) {
      case "\\":
        if (input.next()) {
          switch (input.c) {
            case "\\":
              b.push(input.c.charCodeAt(0));
              break;
            case "b":
              b.push(8);
              break;
            case "f":
              b.push(12);
              break;
            case "n":
              b.push(10);
              break;
            case "r":
              b.push(13);
              break;
            case "t":
              b.push(9);
              break;
            case "v":
              b.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 8);
              if (Number.isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "x": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (Number.isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "u": {
              const s = input.c;
              const t = input.take(4);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (Number.isNaN(n)) {
                return false;
              }
              const chunk = new Uint8Array(4);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, n, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
              break;
            }
            case "U": {
              const s = input.c;
              const t = input.take(8);
              if (t === false) {
                return false;
              }
              const tc = protoInt64.uEnc(s + t);
              const chunk = new Uint8Array(8);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, tc.lo, true);
              view.setInt32(4, tc.hi, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
              break;
            }
          }
        }
        break;
      default:
        b.push(input.c.charCodeAt(0));
    }
  }
  return new Uint8Array(b);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
function* nestedTypes(desc) {
  switch (desc.kind) {
    case "file":
      for (const message of desc.messages) {
        yield message;
        yield* nestedTypes(message);
      }
      yield* desc.enums;
      yield* desc.services;
      yield* desc.extensions;
      break;
    case "message":
      for (const message of desc.nestedMessages) {
        yield message;
        yield* nestedTypes(message);
      }
      yield* desc.nestedEnums;
      yield* desc.nestedExtensions;
      break;
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/registry.js
function createFileRegistry(...args) {
  const registry = createBaseRegistry();
  if (!args.length) {
    return registry;
  }
  if ("$typeName" in args[0] && args[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const file of args[0].file) {
      addFile(file, registry);
    }
    return registry;
  }
  if ("$typeName" in args[0]) {
    let recurseDeps = function(file) {
      const deps = [];
      for (const protoFileName of file.dependency) {
        if (registry.getFile(protoFileName) != void 0) {
          continue;
        }
        if (seen.has(protoFileName)) {
          continue;
        }
        const dep = resolve(protoFileName);
        if (!dep) {
          throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
        }
        if ("kind" in dep) {
          registry.addFile(dep, false, true);
        } else {
          seen.add(dep.name);
          deps.push(dep);
        }
      }
      return deps.concat(...deps.map(recurseDeps));
    };
    const input = args[0];
    const resolve = args[1];
    const seen = /* @__PURE__ */ new Set();
    for (const file of [input, ...recurseDeps(input)].reverse()) {
      addFile(file, registry);
    }
  } else {
    for (const fileReg of args) {
      for (const file of fileReg.files) {
        registry.addFile(file);
      }
    }
  }
  return registry;
}
function createBaseRegistry() {
  const types = /* @__PURE__ */ new Map();
  const extendees = /* @__PURE__ */ new Map();
  const files = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types,
    extendees,
    [Symbol.iterator]() {
      return types.values();
    },
    get files() {
      return files.values();
    },
    addFile(file, skipTypes, withDeps) {
      files.set(file.proto.name, file);
      if (!skipTypes) {
        for (const type of nestedTypes(file)) {
          this.add(type);
        }
      }
      if (withDeps) {
        for (const f of file.dependencies) {
          this.addFile(f, skipTypes, withDeps);
        }
      }
    },
    add(desc) {
      if (desc.kind == "extension") {
        let numberToExt = extendees.get(desc.extendee.typeName);
        if (!numberToExt) {
          extendees.set(
            desc.extendee.typeName,
            // biome-ignore lint/suspicious/noAssignInExpressions: no
            numberToExt = /* @__PURE__ */ new Map()
          );
        }
        numberToExt.set(desc.number, desc);
      }
      types.set(desc.typeName, desc);
    },
    get(typeName) {
      return types.get(typeName);
    },
    getFile(fileName) {
      return files.get(fileName);
    },
    getMessage(typeName) {
      const t = types.get(typeName);
      return (t === null || t === void 0 ? void 0 : t.kind) == "message" ? t : void 0;
    },
    getEnum(typeName) {
      const t = types.get(typeName);
      return (t === null || t === void 0 ? void 0 : t.kind) == "enum" ? t : void 0;
    },
    getExtension(typeName) {
      const t = types.get(typeName);
      return (t === null || t === void 0 ? void 0 : t.kind) == "extension" ? t : void 0;
    },
    getExtensionFor(extendee, no) {
      var _a;
      return (_a = extendees.get(extendee.typeName)) === null || _a === void 0 ? void 0 : _a.get(no);
    },
    getService(typeName) {
      const t = types.get(typeName);
      return (t === null || t === void 0 ? void 0 : t.kind) == "service" ? t : void 0;
    }
  };
}
var EDITION_PROTO22 = 998;
var EDITION_PROTO32 = 999;
var EDITION_UNSTABLE = 9999;
var TYPE_STRING = 9;
var TYPE_GROUP = 10;
var TYPE_MESSAGE = 11;
var TYPE_BYTES = 12;
var TYPE_ENUM = 14;
var LABEL_REPEATED = 3;
var LABEL_REQUIRED = 2;
var JS_STRING = 1;
var IDEMPOTENCY_UNKNOWN = 0;
var EXPLICIT = 1;
var IMPLICIT2 = 2;
var LEGACY_REQUIRED = 3;
var PACKED = 1;
var DELIMITED = 2;
var OPEN = 1;
var VERIFY = 2;
var maximumEdition = 1002;
var featureDefaults = {
  // EDITION_PROTO2
  998: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 2,
    // CLOSED,
    repeatedFieldEncoding: 2,
    // EXPANDED,
    utf8Validation: 3,
    // NONE,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 2,
    // LEGACY_BEST_EFFORT,
    enforceNamingStyle: 2,
    // STYLE_LEGACY,
    defaultSymbolVisibility: 1,
    // EXPORT_ALL,
    enforceProtoLimits: 1
    // LEGACY_NO_EXPLICIT_LIMITS,
  },
  // EDITION_PROTO3
  999: {
    fieldPresence: 2,
    // IMPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 2,
    // STYLE_LEGACY,
    defaultSymbolVisibility: 1,
    // EXPORT_ALL,
    enforceProtoLimits: 1
    // LEGACY_NO_EXPLICIT_LIMITS,
  },
  // EDITION_2023
  1e3: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 2,
    // STYLE_LEGACY,
    defaultSymbolVisibility: 1,
    // EXPORT_ALL,
    enforceProtoLimits: 1
    // LEGACY_NO_EXPLICIT_LIMITS,
  },
  // EDITION_2024
  1001: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 1,
    // STYLE2024,
    defaultSymbolVisibility: 2,
    // EXPORT_TOP_LEVEL,
    enforceProtoLimits: 1
    // LEGACY_NO_EXPLICIT_LIMITS,
  },
  // EDITION_2026
  1002: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 3,
    // STYLE2026,
    defaultSymbolVisibility: 4,
    // STRICT,
    enforceProtoLimits: 2
    // PROTO_LIMITS2026,
  }
};
function addFile(proto, reg) {
  var _a, _b;
  const file = {
    kind: "file",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    edition: getFileEdition(proto),
    name: proto.name.replace(/\.proto$/, ""),
    dependencies: findFileDependencies(proto, reg),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${proto.name}`;
    }
  };
  const mapEntriesStore = /* @__PURE__ */ new Map();
  const mapEntries = {
    get(typeName) {
      return mapEntriesStore.get(typeName);
    },
    add(desc) {
      var _a2;
      assert(((_a2 = desc.proto.options) === null || _a2 === void 0 ? void 0 : _a2.mapEntry) === true);
      mapEntriesStore.set(desc.typeName, desc);
    }
  };
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, void 0, reg);
  }
  for (const messageProto of proto.messageType) {
    addMessage(messageProto, file, void 0, reg, mapEntries);
  }
  for (const serviceProto of proto.service) {
    addService(serviceProto, file, reg);
  }
  addExtensions(file, reg);
  for (const mapEntry of mapEntriesStore.values()) {
    addFields(mapEntry, reg, mapEntries);
  }
  for (const message of file.messages) {
    addFields(message, reg, mapEntries);
    addExtensions(message, reg);
  }
  reg.addFile(file, true);
}
function addExtensions(desc, reg) {
  switch (desc.kind) {
    case "file":
      for (const proto of desc.proto.extension) {
        const ext = newField(proto, desc, reg);
        desc.extensions.push(ext);
        reg.add(ext);
      }
      break;
    case "message":
      for (const proto of desc.proto.extension) {
        const ext = newField(proto, desc, reg);
        desc.nestedExtensions.push(ext);
        reg.add(ext);
      }
      for (const message of desc.nestedMessages) {
        addExtensions(message, reg);
      }
      break;
  }
}
function addFields(message, reg, mapEntries) {
  const allOneofs = message.proto.oneofDecl.map((proto) => newOneof(proto, message));
  const oneofsSeen = /* @__PURE__ */ new Set();
  for (const proto of message.proto.field) {
    const oneof = findOneof(proto, allOneofs);
    const field = newField(proto, message, reg, oneof, mapEntries);
    message.fields.push(field);
    message.field[field.localName] = field;
    if (oneof === void 0) {
      message.members.push(field);
    } else {
      oneof.fields.push(field);
      if (!oneofsSeen.has(oneof)) {
        oneofsSeen.add(oneof);
        message.members.push(oneof);
      }
    }
  }
  for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) {
    message.oneofs.push(oneof);
  }
  for (const child of message.nestedMessages) {
    addFields(child, reg, mapEntries);
  }
}
function addEnum(proto, file, parent, reg) {
  var _a, _b, _c, _d, _e, _f;
  const sharedPrefix = findEnumSharedPrefix(proto.name, proto.value);
  const desc = {
    kind: "enum",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    file,
    parent,
    open: true,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    value: {},
    values: [],
    sharedPrefix,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  desc.open = isEnumOpen(desc);
  reg.add(desc);
  for (const p of proto.value) {
    const name = p.name;
    desc.values.push(
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      desc.value[p.number] = {
        kind: "enum_value",
        proto: p,
        deprecated: (_d = (_c = p.options) === null || _c === void 0 ? void 0 : _c.deprecated) !== null && _d !== void 0 ? _d : false,
        parent: desc,
        name,
        localName: safeObjectProperty(sharedPrefix == void 0 ? name : name.substring(sharedPrefix.length)),
        number: p.number,
        jsonName: (_e = findEnumValueJsonName(p)) !== null && _e !== void 0 ? _e : name,
        toString() {
          return `enum value ${desc.typeName}.${name}`;
        }
      }
    );
  }
  ((_f = parent === null || parent === void 0 ? void 0 : parent.nestedEnums) !== null && _f !== void 0 ? _f : file.enums).push(desc);
}
function addMessage(proto, file, parent, reg, mapEntries) {
  var _a, _b, _c, _d;
  const desc = {
    kind: "message",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    file,
    parent,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    fields: [],
    field: {},
    oneofs: [],
    members: [],
    nestedEnums: [],
    nestedMessages: [],
    nestedExtensions: [],
    toString() {
      return `message ${this.typeName}`;
    }
  };
  if (((_c = proto.options) === null || _c === void 0 ? void 0 : _c.mapEntry) === true) {
    mapEntries.add(desc);
  } else {
    ((_d = parent === null || parent === void 0 ? void 0 : parent.nestedMessages) !== null && _d !== void 0 ? _d : file.messages).push(desc);
    reg.add(desc);
  }
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, desc, reg);
  }
  for (const messageProto of proto.nestedType) {
    addMessage(messageProto, file, desc, reg, mapEntries);
  }
}
function addService(proto, file, reg) {
  var _a, _b;
  const desc = {
    kind: "service",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    file,
    name: proto.name,
    typeName: makeTypeName(proto, void 0, file),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  file.services.push(desc);
  reg.add(desc);
  for (const methodProto of proto.method) {
    const method = newMethod(methodProto, desc, reg);
    desc.methods.push(method);
    desc.method[method.localName] = method;
  }
}
function newMethod(proto, parent, reg) {
  var _a, _b, _c, _d;
  let methodKind;
  if (proto.clientStreaming && proto.serverStreaming) {
    methodKind = "bidi_streaming";
  } else if (proto.clientStreaming) {
    methodKind = "client_streaming";
  } else if (proto.serverStreaming) {
    methodKind = "server_streaming";
  } else {
    methodKind = "unary";
  }
  const input = reg.getMessage(trimLeadingDot(proto.inputType));
  const output = reg.getMessage(trimLeadingDot(proto.outputType));
  assert(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
  assert(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
  const name = proto.name;
  return {
    kind: "rpc",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    parent,
    name,
    localName: safeObjectProperty(name.length ? safeObjectProperty(name[0].toLowerCase() + name.substring(1)) : name),
    methodKind,
    input,
    output,
    idempotency: (_d = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.idempotencyLevel) !== null && _d !== void 0 ? _d : IDEMPOTENCY_UNKNOWN,
    toString() {
      return `rpc ${parent.typeName}.${name}`;
    }
  };
}
function newOneof(proto, parent) {
  return {
    kind: "oneof",
    proto,
    deprecated: false,
    parent,
    fields: [],
    name: proto.name,
    localName: safeObjectProperty(protoCamelCase(proto.name)),
    toString() {
      return `oneof ${parent.typeName}.${this.name}`;
    }
  };
}
function newField(proto, parentOrFile, reg, oneof, mapEntries) {
  var _a, _b, _c;
  const isExtension = mapEntries === void 0;
  const field = {
    kind: "field",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    name: proto.name,
    number: proto.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: getFieldPresence(proto, oneof, isExtension, parentOrFile),
    utf8Validation: isUtf8Validated(proto, parentOrFile),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: false,
    getDefaultValue: void 0
  };
  let toStr;
  if (isExtension) {
    const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
    const parent = parentOrFile.kind == "file" ? void 0 : parentOrFile;
    const typeName = makeTypeName(proto, parent, file);
    field.kind = "extension";
    field.file = file;
    field.parent = parent;
    field.oneof = void 0;
    field.typeName = typeName;
    field.jsonName = `[${typeName}]`;
    toStr = () => `extension ${typeName}`;
    const extendee = reg.getMessage(trimLeadingDot(proto.extendee));
    assert(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
    field.extendee = extendee;
  } else {
    const parent = parentOrFile;
    assert(parent.kind == "message");
    field.parent = parent;
    field.oneof = oneof;
    field.localName = oneof ? protoCamelCase(proto.name) : safeObjectProperty(protoCamelCase(proto.name));
    field.jsonName = proto.jsonName;
    toStr = () => `field ${parent.typeName}.${proto.name}`;
  }
  Object.defineProperty(field, "toString", {
    value: toStr,
    writable: true,
    enumerable: true,
    configurable: true
  });
  const label = proto.label;
  const type = proto.type;
  const jstype = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.jstype;
  if (label === LABEL_REPEATED) {
    const mapEntry = type == TYPE_MESSAGE ? mapEntries === null || mapEntries === void 0 ? void 0 : mapEntries.get(trimLeadingDot(proto.typeName)) : void 0;
    if (mapEntry) {
      field.fieldKind = "map";
      const { key: key2, value } = findMapEntryFields(mapEntry);
      field.mapKey = key2.scalar;
      field.mapKind = value.fieldKind;
      field.message = value.message;
      field.delimitedEncoding = false;
      field.enum = value.enum;
      field.scalar = value.scalar;
      return field;
    }
    field.fieldKind = "list";
    switch (type) {
      case TYPE_MESSAGE:
      case TYPE_GROUP:
        field.listKind = "message";
        field.message = reg.getMessage(trimLeadingDot(proto.typeName));
        assert(field.message);
        field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
        break;
      case TYPE_ENUM:
        field.listKind = "enum";
        field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
        assert(field.enum);
        break;
      default:
        field.listKind = "scalar";
        field.scalar = type;
        field.longAsString = jstype == JS_STRING;
        break;
    }
    field.packed = isPackedField(proto, parentOrFile);
    return field;
  }
  switch (type) {
    case TYPE_MESSAGE:
    case TYPE_GROUP:
      field.fieldKind = "message";
      field.message = reg.getMessage(trimLeadingDot(proto.typeName));
      assert(field.message, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
      field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
      field.getDefaultValue = () => void 0;
      break;
    case TYPE_ENUM: {
      const enumeration = reg.getEnum(trimLeadingDot(proto.typeName));
      assert(enumeration !== void 0, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
      field.fieldKind = "enum";
      field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
      field.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatEnumValue(enumeration, proto.defaultValue) : void 0;
      };
      break;
    }
    default: {
      field.fieldKind = "scalar";
      field.scalar = type;
      field.longAsString = jstype == JS_STRING;
      field.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatScalarValue(type, proto.defaultValue) : void 0;
      };
      break;
    }
  }
  return field;
}
function getFileEdition(proto) {
  switch (proto.syntax) {
    case "":
    case "proto2":
      return EDITION_PROTO22;
    case "proto3":
      return EDITION_PROTO32;
    case "editions":
      if (proto.edition === EDITION_UNSTABLE) {
        return maximumEdition;
      }
      if (proto.edition in featureDefaults) {
        return proto.edition;
      }
      throw new Error(`${proto.name}: unsupported edition`);
    default:
      throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
  }
}
function findFileDependencies(proto, reg) {
  return proto.dependency.map((wantName) => {
    const dep = reg.getFile(wantName);
    if (!dep) {
      throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
    }
    return dep;
  });
}
function findEnumSharedPrefix(enumName, values) {
  const prefix = camelToSnakeCase(enumName) + "_";
  for (const value of values) {
    if (!value.name.toLowerCase().startsWith(prefix)) {
      return void 0;
    }
    const shortName = value.name.substring(prefix.length);
    if (shortName.length == 0) {
      return void 0;
    }
    if (/^\d/.test(shortName)) {
      return void 0;
    }
  }
  return prefix;
}
function findEnumValueJsonName(proto) {
  var _a, _b;
  const extensionNumber = 998;
  const fieldNumber = 1;
  let jsonName;
  for (const uf of (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.$unknown) !== null && _b !== void 0 ? _b : []) {
    if (uf.no !== extensionNumber || uf.wireType !== WireType.LengthDelimited) {
      continue;
    }
    const reader = new BinaryReader(new BinaryReader(uf.data).bytes());
    while (reader.pos < reader.len) {
      const [no, wireType] = reader.tag();
      if (no === fieldNumber && wireType === WireType.LengthDelimited) {
        jsonName = reader.string();
      } else {
        reader.skip(wireType, no);
      }
    }
  }
  return jsonName;
}
function camelToSnakeCase(camel) {
  return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)).toLowerCase();
}
function makeTypeName(proto, parent, file) {
  let typeName;
  if (parent) {
    typeName = `${parent.typeName}.${proto.name}`;
  } else if (file.proto.package.length > 0) {
    typeName = `${file.proto.package}.${proto.name}`;
  } else {
    typeName = `${proto.name}`;
  }
  return typeName;
}
function trimLeadingDot(typeName) {
  return typeName.startsWith(".") ? typeName.substring(1) : typeName;
}
function findOneof(proto, allOneofs) {
  if (!unsafeIsSetExplicit(proto, "oneofIndex")) {
    return void 0;
  }
  if (proto.proto3Optional) {
    return void 0;
  }
  const oneof = allOneofs[proto.oneofIndex];
  assert(oneof, `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`);
  return oneof;
}
function getFieldPresence(proto, oneof, isExtension, parent) {
  if (proto.label == LABEL_REQUIRED) {
    return LEGACY_REQUIRED;
  }
  if (proto.label == LABEL_REPEATED) {
    return IMPLICIT2;
  }
  if (!!oneof || proto.proto3Optional) {
    return EXPLICIT;
  }
  if (isExtension) {
    return EXPLICIT;
  }
  const resolved = resolveFeature("fieldPresence", { proto, parent });
  if (resolved == IMPLICIT2 && (proto.type == TYPE_MESSAGE || proto.type == TYPE_GROUP)) {
    return EXPLICIT;
  }
  return resolved;
}
function isPackedField(proto, parent) {
  if (proto.label != LABEL_REPEATED) {
    return false;
  }
  switch (proto.type) {
    case TYPE_STRING:
    case TYPE_BYTES:
    case TYPE_GROUP:
    case TYPE_MESSAGE:
      return false;
  }
  const o = proto.options;
  if (o && unsafeIsSetExplicit(o, "packed")) {
    return o.packed;
  }
  return PACKED == resolveFeature("repeatedFieldEncoding", {
    proto,
    parent
  });
}
function findMapEntryFields(mapEntry) {
  const key2 = mapEntry.fields.find((f) => f.number === 1);
  const value = mapEntry.fields.find((f) => f.number === 2);
  assert(key2 && key2.fieldKind == "scalar" && key2.scalar != ScalarType.BYTES && key2.scalar != ScalarType.FLOAT && key2.scalar != ScalarType.DOUBLE && value && value.fieldKind != "list" && value.fieldKind != "map");
  return { key: key2, value };
}
function isEnumOpen(desc) {
  var _a;
  return OPEN == resolveFeature("enumType", {
    proto: desc.proto,
    parent: (_a = desc.parent) !== null && _a !== void 0 ? _a : desc.file
  });
}
function isDelimitedEncoding(proto, parent) {
  if (proto.type == TYPE_GROUP) {
    return true;
  }
  return DELIMITED == resolveFeature("messageEncoding", {
    proto,
    parent
  });
}
function isUtf8Validated(proto, parent) {
  return VERIFY == resolveFeature("utf8Validation", {
    proto,
    parent
  });
}
function resolveFeature(name, ref) {
  var _a, _b;
  const featureSet = (_a = ref.proto.options) === null || _a === void 0 ? void 0 : _a.features;
  if (featureSet) {
    const val = featureSet[name];
    if (val != 0) {
      return val;
    }
  }
  if ("kind" in ref) {
    if (ref.kind == "message") {
      return resolveFeature(name, (_b = ref.parent) !== null && _b !== void 0 ? _b : ref.file);
    }
    const editionDefaults = featureDefaults[ref.edition];
    if (!editionDefaults) {
      throw new Error(`feature default for edition ${ref.edition} not found`);
    }
    return editionDefaults[name];
  }
  return resolveFeature(name, ref.parent);
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/boot.js
function boot(boot2) {
  const root = bootFileDescriptorProto(boot2);
  root.messageType.forEach(restoreJsonNames);
  const reg = createFileRegistry(root, () => void 0);
  return reg.getFile(root.name);
}
function bootFileDescriptorProto(init) {
  const proto = /* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, init), { messageType: init.messageType.map(bootDescriptorProto), enumType: init.enumType.map(bootEnumDescriptorProto) }));
}
function bootDescriptorProto(init) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const proto = /* @__PURE__ */ Object.create({
    visibility: 0
  });
  return Object.assign(proto, {
    $typeName: "google.protobuf.DescriptorProto",
    name: init.name,
    field: (_b = (_a = init.field) === null || _a === void 0 ? void 0 : _a.map(bootFieldDescriptorProto)) !== null && _b !== void 0 ? _b : [],
    extension: [],
    nestedType: (_d = (_c = init.nestedType) === null || _c === void 0 ? void 0 : _c.map(bootDescriptorProto)) !== null && _d !== void 0 ? _d : [],
    enumType: (_f = (_e = init.enumType) === null || _e === void 0 ? void 0 : _e.map(bootEnumDescriptorProto)) !== null && _f !== void 0 ? _f : [],
    extensionRange: (_h = (_g = init.extensionRange) === null || _g === void 0 ? void 0 : _g.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e))) !== null && _h !== void 0 ? _h : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  });
}
function bootFieldDescriptorProto(init) {
  const proto = /* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: false
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, init), { options: init.options ? bootFieldOptions(init.options) : void 0 }));
}
function bootFieldOptions(init) {
  var _a, _b, _c;
  const proto = /* @__PURE__ */ Object.create({
    ctype: 0,
    packed: false,
    jstype: 0,
    lazy: false,
    unverifiedLazy: false,
    deprecated: false,
    weak: false,
    debugRedact: false,
    retention: 0
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, init), { targets: (_a = init.targets) !== null && _a !== void 0 ? _a : [], editionDefaults: (_c = (_b = init.editionDefaults) === null || _b === void 0 ? void 0 : _b.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e))) !== null && _c !== void 0 ? _c : [], uninterpretedOption: [] }));
}
function bootEnumDescriptorProto(init) {
  const proto = /* @__PURE__ */ Object.create({
    visibility: 0
  });
  return Object.assign(proto, {
    $typeName: "google.protobuf.EnumDescriptorProto",
    name: init.name,
    reservedName: [],
    reservedRange: [],
    value: init.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
  });
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/message.js
function messageDesc(file, path, ...paths) {
  return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wkt/google/protobuf/descriptor_pb.js
var file_google_protobuf_descriptor = /* @__PURE__ */ boot({ "name": "google/protobuf/descriptor.proto", "package": "google.protobuf", "messageType": [{ "name": "FileDescriptorSet", "field": [{ "name": "file", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.FileDescriptorProto" }], "extensionRange": [{ "start": 536e6, "end": 536000001 }] }, { "name": "FileDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "package", "number": 2, "type": 9, "label": 1 }, { "name": "dependency", "number": 3, "type": 9, "label": 3 }, { "name": "public_dependency", "number": 10, "type": 5, "label": 3 }, { "name": "weak_dependency", "number": 11, "type": 5, "label": 3 }, { "name": "option_dependency", "number": 15, "type": 9, "label": 3 }, { "name": "message_type", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto" }, { "name": "enum_type", "number": 5, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto" }, { "name": "service", "number": 6, "type": 11, "label": 3, "typeName": ".google.protobuf.ServiceDescriptorProto" }, { "name": "extension", "number": 7, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "options", "number": 8, "type": 11, "label": 1, "typeName": ".google.protobuf.FileOptions" }, { "name": "source_code_info", "number": 9, "type": 11, "label": 1, "typeName": ".google.protobuf.SourceCodeInfo" }, { "name": "syntax", "number": 12, "type": 9, "label": 1 }, { "name": "edition", "number": 14, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }] }, { "name": "DescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "field", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "extension", "number": 6, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "nested_type", "number": 3, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto" }, { "name": "enum_type", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto" }, { "name": "extension_range", "number": 5, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto.ExtensionRange" }, { "name": "oneof_decl", "number": 8, "type": 11, "label": 3, "typeName": ".google.protobuf.OneofDescriptorProto" }, { "name": "options", "number": 7, "type": 11, "label": 1, "typeName": ".google.protobuf.MessageOptions" }, { "name": "reserved_range", "number": 9, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto.ReservedRange" }, { "name": "reserved_name", "number": 10, "type": 9, "label": 3 }, { "name": "visibility", "number": 11, "type": 14, "label": 1, "typeName": ".google.protobuf.SymbolVisibility" }], "nestedType": [{ "name": "ExtensionRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.ExtensionRangeOptions" }] }, { "name": "ReservedRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }] }] }, { "name": "ExtensionRangeOptions", "field": [{ "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }, { "name": "declaration", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.ExtensionRangeOptions.Declaration", "options": { "retention": 2 } }, { "name": "features", "number": 50, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "verification", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.ExtensionRangeOptions.VerificationState", "defaultValue": "UNVERIFIED", "options": { "retention": 2 } }], "nestedType": [{ "name": "Declaration", "field": [{ "name": "number", "number": 1, "type": 5, "label": 1 }, { "name": "full_name", "number": 2, "type": 9, "label": 1 }, { "name": "type", "number": 3, "type": 9, "label": 1 }, { "name": "reserved", "number": 5, "type": 8, "label": 1 }, { "name": "repeated", "number": 6, "type": 8, "label": 1 }] }], "enumType": [{ "name": "VerificationState", "value": [{ "name": "DECLARATION", "number": 0 }, { "name": "UNVERIFIED", "number": 1 }] }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "FieldDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "number", "number": 3, "type": 5, "label": 1 }, { "name": "label", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldDescriptorProto.Label" }, { "name": "type", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldDescriptorProto.Type" }, { "name": "type_name", "number": 6, "type": 9, "label": 1 }, { "name": "extendee", "number": 2, "type": 9, "label": 1 }, { "name": "default_value", "number": 7, "type": 9, "label": 1 }, { "name": "oneof_index", "number": 9, "type": 5, "label": 1 }, { "name": "json_name", "number": 10, "type": 9, "label": 1 }, { "name": "options", "number": 8, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions" }, { "name": "proto3_optional", "number": 17, "type": 8, "label": 1 }], "enumType": [{ "name": "Type", "value": [{ "name": "TYPE_DOUBLE", "number": 1 }, { "name": "TYPE_FLOAT", "number": 2 }, { "name": "TYPE_INT64", "number": 3 }, { "name": "TYPE_UINT64", "number": 4 }, { "name": "TYPE_INT32", "number": 5 }, { "name": "TYPE_FIXED64", "number": 6 }, { "name": "TYPE_FIXED32", "number": 7 }, { "name": "TYPE_BOOL", "number": 8 }, { "name": "TYPE_STRING", "number": 9 }, { "name": "TYPE_GROUP", "number": 10 }, { "name": "TYPE_MESSAGE", "number": 11 }, { "name": "TYPE_BYTES", "number": 12 }, { "name": "TYPE_UINT32", "number": 13 }, { "name": "TYPE_ENUM", "number": 14 }, { "name": "TYPE_SFIXED32", "number": 15 }, { "name": "TYPE_SFIXED64", "number": 16 }, { "name": "TYPE_SINT32", "number": 17 }, { "name": "TYPE_SINT64", "number": 18 }] }, { "name": "Label", "value": [{ "name": "LABEL_OPTIONAL", "number": 1 }, { "name": "LABEL_REPEATED", "number": 3 }, { "name": "LABEL_REQUIRED", "number": 2 }] }] }, { "name": "OneofDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "options", "number": 2, "type": 11, "label": 1, "typeName": ".google.protobuf.OneofOptions" }] }, { "name": "EnumDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "value", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumValueDescriptorProto" }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.EnumOptions" }, { "name": "reserved_range", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { "name": "reserved_name", "number": 5, "type": 9, "label": 3 }, { "name": "visibility", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.SymbolVisibility" }], "nestedType": [{ "name": "EnumReservedRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }] }] }, { "name": "EnumValueDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "number", "number": 2, "type": 5, "label": 1 }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.EnumValueOptions" }] }, { "name": "ServiceDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "method", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.MethodDescriptorProto" }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.ServiceOptions" }] }, { "name": "MethodDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "input_type", "number": 2, "type": 9, "label": 1 }, { "name": "output_type", "number": 3, "type": 9, "label": 1 }, { "name": "options", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.MethodOptions" }, { "name": "client_streaming", "number": 5, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "server_streaming", "number": 6, "type": 8, "label": 1, "defaultValue": "false" }] }, { "name": "FileOptions", "field": [{ "name": "java_package", "number": 1, "type": 9, "label": 1 }, { "name": "java_outer_classname", "number": 8, "type": 9, "label": 1 }, { "name": "java_multiple_files", "number": 10, "type": 8, "label": 1, "defaultValue": "false", "options": {} }, { "name": "java_generate_equals_and_hash", "number": 20, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "java_string_check_utf8", "number": 27, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "optimize_for", "number": 9, "type": 14, "label": 1, "typeName": ".google.protobuf.FileOptions.OptimizeMode", "defaultValue": "SPEED" }, { "name": "go_package", "number": 11, "type": 9, "label": 1 }, { "name": "cc_generic_services", "number": 16, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "java_generic_services", "number": 17, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "py_generic_services", "number": 18, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 23, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "cc_enable_arenas", "number": 31, "type": 8, "label": 1, "defaultValue": "true", "options": {} }, { "name": "objc_class_prefix", "number": 36, "type": 9, "label": 1 }, { "name": "csharp_namespace", "number": 37, "type": 9, "label": 1 }, { "name": "swift_prefix", "number": 39, "type": 9, "label": 1 }, { "name": "php_class_prefix", "number": 40, "type": 9, "label": 1 }, { "name": "php_namespace", "number": 41, "type": 9, "label": 1 }, { "name": "php_metadata_namespace", "number": 44, "type": 9, "label": 1 }, { "name": "ruby_package", "number": 45, "type": 9, "label": 1 }, { "name": "features", "number": 50, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "enumType": [{ "name": "OptimizeMode", "value": [{ "name": "SPEED", "number": 1 }, { "name": "CODE_SIZE", "number": 2 }, { "name": "LITE_RUNTIME", "number": 3 }] }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "MessageOptions", "field": [{ "name": "message_set_wire_format", "number": 1, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "no_standard_descriptor_accessor", "number": 2, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "map_entry", "number": 7, "type": 8, "label": 1 }, { "name": "deprecated_legacy_json_field_conflicts", "number": 11, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "features", "number": 12, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "FieldOptions", "field": [{ "name": "ctype", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.CType", "defaultValue": "STRING" }, { "name": "packed", "number": 2, "type": 8, "label": 1 }, { "name": "jstype", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.JSType", "defaultValue": "JS_NORMAL" }, { "name": "lazy", "number": 5, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "unverified_lazy", "number": 15, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "weak", "number": 10, "type": 8, "label": 1, "defaultValue": "false", "options": { "deprecated": true } }, { "name": "debug_redact", "number": 16, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "retention", "number": 17, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.OptionRetention" }, { "name": "targets", "number": 19, "type": 14, "label": 3, "typeName": ".google.protobuf.FieldOptions.OptionTargetType" }, { "name": "edition_defaults", "number": 20, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldOptions.EditionDefault" }, { "name": "features", "number": 21, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "feature_support", "number": 22, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions.FeatureSupport" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "nestedType": [{ "name": "EditionDefault", "field": [{ "name": "edition", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "value", "number": 2, "type": 9, "label": 1 }] }, { "name": "FeatureSupport", "field": [{ "name": "edition_introduced", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "edition_deprecated", "number": 2, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "deprecation_warning", "number": 3, "type": 9, "label": 1 }, { "name": "edition_removed", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "removal_error", "number": 5, "type": 9, "label": 1 }] }], "enumType": [{ "name": "CType", "value": [{ "name": "STRING", "number": 0 }, { "name": "CORD", "number": 1 }, { "name": "STRING_PIECE", "number": 2 }] }, { "name": "JSType", "value": [{ "name": "JS_NORMAL", "number": 0 }, { "name": "JS_STRING", "number": 1 }, { "name": "JS_NUMBER", "number": 2 }] }, { "name": "OptionRetention", "value": [{ "name": "RETENTION_UNKNOWN", "number": 0 }, { "name": "RETENTION_RUNTIME", "number": 1 }, { "name": "RETENTION_SOURCE", "number": 2 }] }, { "name": "OptionTargetType", "value": [{ "name": "TARGET_TYPE_UNKNOWN", "number": 0 }, { "name": "TARGET_TYPE_FILE", "number": 1 }, { "name": "TARGET_TYPE_EXTENSION_RANGE", "number": 2 }, { "name": "TARGET_TYPE_MESSAGE", "number": 3 }, { "name": "TARGET_TYPE_FIELD", "number": 4 }, { "name": "TARGET_TYPE_ONEOF", "number": 5 }, { "name": "TARGET_TYPE_ENUM", "number": 6 }, { "name": "TARGET_TYPE_ENUM_ENTRY", "number": 7 }, { "name": "TARGET_TYPE_SERVICE", "number": 8 }, { "name": "TARGET_TYPE_METHOD", "number": 9 }] }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "OneofOptions", "field": [{ "name": "features", "number": 1, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "EnumOptions", "field": [{ "name": "allow_alias", "number": 2, "type": 8, "label": 1 }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated_legacy_json_field_conflicts", "number": 6, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "features", "number": 7, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "EnumValueOptions", "field": [{ "name": "deprecated", "number": 1, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "features", "number": 2, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "debug_redact", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "feature_support", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions.FeatureSupport" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "ServiceOptions", "field": [{ "name": "features", "number": 34, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "deprecated", "number": 33, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "MethodOptions", "field": [{ "name": "deprecated", "number": 33, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "idempotency_level", "number": 34, "type": 14, "label": 1, "typeName": ".google.protobuf.MethodOptions.IdempotencyLevel", "defaultValue": "IDEMPOTENCY_UNKNOWN" }, { "name": "features", "number": 35, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "enumType": [{ "name": "IdempotencyLevel", "value": [{ "name": "IDEMPOTENCY_UNKNOWN", "number": 0 }, { "name": "NO_SIDE_EFFECTS", "number": 1 }, { "name": "IDEMPOTENT", "number": 2 }] }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "UninterpretedOption", "field": [{ "name": "name", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption.NamePart" }, { "name": "identifier_value", "number": 3, "type": 9, "label": 1 }, { "name": "positive_int_value", "number": 4, "type": 4, "label": 1 }, { "name": "negative_int_value", "number": 5, "type": 3, "label": 1 }, { "name": "double_value", "number": 6, "type": 1, "label": 1 }, { "name": "string_value", "number": 7, "type": 12, "label": 1 }, { "name": "aggregate_value", "number": 8, "type": 9, "label": 1 }], "nestedType": [{ "name": "NamePart", "field": [{ "name": "name_part", "number": 1, "type": 9, "label": 2 }, { "name": "is_extension", "number": 2, "type": 8, "label": 2 }] }] }, { "name": "FeatureSet", "field": [{ "name": "field_presence", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.FieldPresence", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "EXPLICIT", "edition": 900 }, { "value": "IMPLICIT", "edition": 999 }, { "value": "EXPLICIT", "edition": 1e3 }] } }, { "name": "enum_type", "number": 2, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.EnumType", "options": { "retention": 1, "targets": [6, 1], "editionDefaults": [{ "value": "CLOSED", "edition": 900 }, { "value": "OPEN", "edition": 999 }] } }, { "name": "repeated_field_encoding", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.RepeatedFieldEncoding", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "EXPANDED", "edition": 900 }, { "value": "PACKED", "edition": 999 }] } }, { "name": "utf8_validation", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.Utf8Validation", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "NONE", "edition": 900 }, { "value": "VERIFY", "edition": 999 }] } }, { "name": "message_encoding", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.MessageEncoding", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "LENGTH_PREFIXED", "edition": 900 }] } }, { "name": "json_format", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.JsonFormat", "options": { "retention": 1, "targets": [3, 6, 1], "editionDefaults": [{ "value": "LEGACY_BEST_EFFORT", "edition": 900 }, { "value": "ALLOW", "edition": 999 }] } }, { "name": "enforce_naming_style", "number": 7, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.EnforceNamingStyle", "options": { "retention": 2, "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9], "editionDefaults": [{ "value": "STYLE_LEGACY", "edition": 900 }, { "value": "STYLE2024", "edition": 1001 }, { "value": "STYLE2026", "edition": 1002 }] } }, { "name": "default_symbol_visibility", "number": 8, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", "options": { "retention": 2, "targets": [1], "editionDefaults": [{ "value": "EXPORT_ALL", "edition": 900 }, { "value": "EXPORT_TOP_LEVEL", "edition": 1001 }, { "value": "STRICT", "edition": 1002 }] } }, { "name": "enforce_proto_limits", "number": 9, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.ProtoLimitsFeature.EnforceProtoLimits", "options": { "retention": 2, "targets": [6, 3, 4, 5], "editionDefaults": [{ "value": "LEGACY_NO_EXPLICIT_LIMITS", "edition": 900 }, { "value": "PROTO_LIMITS2026", "edition": 1002 }] } }], "nestedType": [{ "name": "VisibilityFeature", "enumType": [{ "name": "DefaultSymbolVisibility", "value": [{ "name": "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", "number": 0 }, { "name": "EXPORT_ALL", "number": 1 }, { "name": "EXPORT_TOP_LEVEL", "number": 2 }, { "name": "LOCAL_ALL", "number": 3 }, { "name": "STRICT", "number": 4 }] }] }, { "name": "ProtoLimitsFeature", "enumType": [{ "name": "EnforceProtoLimits", "value": [{ "name": "PROTO_LIMITS_UNKNOWN", "number": 0 }, { "name": "LEGACY_NO_EXPLICIT_LIMITS", "number": 1 }, { "name": "PROTO_LIMITS2026", "number": 2 }] }] }], "enumType": [{ "name": "FieldPresence", "value": [{ "name": "FIELD_PRESENCE_UNKNOWN", "number": 0 }, { "name": "EXPLICIT", "number": 1 }, { "name": "IMPLICIT", "number": 2 }, { "name": "LEGACY_REQUIRED", "number": 3 }] }, { "name": "EnumType", "value": [{ "name": "ENUM_TYPE_UNKNOWN", "number": 0 }, { "name": "OPEN", "number": 1 }, { "name": "CLOSED", "number": 2 }] }, { "name": "RepeatedFieldEncoding", "value": [{ "name": "REPEATED_FIELD_ENCODING_UNKNOWN", "number": 0 }, { "name": "PACKED", "number": 1 }, { "name": "EXPANDED", "number": 2 }] }, { "name": "Utf8Validation", "value": [{ "name": "UTF8_VALIDATION_UNKNOWN", "number": 0 }, { "name": "VERIFY", "number": 2 }, { "name": "NONE", "number": 3 }] }, { "name": "MessageEncoding", "value": [{ "name": "MESSAGE_ENCODING_UNKNOWN", "number": 0 }, { "name": "LENGTH_PREFIXED", "number": 1 }, { "name": "DELIMITED", "number": 2 }] }, { "name": "JsonFormat", "value": [{ "name": "JSON_FORMAT_UNKNOWN", "number": 0 }, { "name": "ALLOW", "number": 1 }, { "name": "LEGACY_BEST_EFFORT", "number": 2 }] }, { "name": "EnforceNamingStyle", "value": [{ "name": "ENFORCE_NAMING_STYLE_UNKNOWN", "number": 0 }, { "name": "STYLE2024", "number": 1 }, { "name": "STYLE_LEGACY", "number": 2 }, { "name": "STYLE2026", "number": 3 }] }], "extensionRange": [{ "start": 1e3, "end": 9995 }, { "start": 9995, "end": 1e4 }, { "start": 1e4, "end": 10001 }] }, { "name": "FeatureSetDefaults", "field": [{ "name": "defaults", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { "name": "minimum_edition", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "maximum_edition", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }], "nestedType": [{ "name": "FeatureSetEditionDefault", "field": [{ "name": "edition", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "overridable_features", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "fixed_features", "number": 5, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }] }] }, { "name": "SourceCodeInfo", "field": [{ "name": "location", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.SourceCodeInfo.Location" }], "nestedType": [{ "name": "Location", "field": [{ "name": "path", "number": 1, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "span", "number": 2, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "leading_comments", "number": 3, "type": 9, "label": 1 }, { "name": "trailing_comments", "number": 4, "type": 9, "label": 1 }, { "name": "leading_detached_comments", "number": 6, "type": 9, "label": 3 }] }], "extensionRange": [{ "start": 536e6, "end": 536000001 }] }, { "name": "GeneratedCodeInfo", "field": [{ "name": "annotation", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation" }], "nestedType": [{ "name": "Annotation", "field": [{ "name": "path", "number": 1, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "source_file", "number": 2, "type": 9, "label": 1 }, { "name": "begin", "number": 3, "type": 5, "label": 1 }, { "name": "end", "number": 4, "type": 5, "label": 1 }, { "name": "semantic", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], "enumType": [{ "name": "Semantic", "value": [{ "name": "NONE", "number": 0 }, { "name": "SET", "number": 1 }, { "name": "ALIAS", "number": 2 }] }] }] }], "enumType": [{ "name": "Edition", "value": [{ "name": "EDITION_UNKNOWN", "number": 0 }, { "name": "EDITION_LEGACY", "number": 900 }, { "name": "EDITION_PROTO2", "number": 998 }, { "name": "EDITION_PROTO3", "number": 999 }, { "name": "EDITION_2023", "number": 1e3 }, { "name": "EDITION_2024", "number": 1001 }, { "name": "EDITION_2026", "number": 1002 }, { "name": "EDITION_UNSTABLE", "number": 9999 }, { "name": "EDITION_1_TEST_ONLY", "number": 1 }, { "name": "EDITION_2_TEST_ONLY", "number": 2 }, { "name": "EDITION_99997_TEST_ONLY", "number": 99997 }, { "name": "EDITION_99998_TEST_ONLY", "number": 99998 }, { "name": "EDITION_99999_TEST_ONLY", "number": 99999 }, { "name": "EDITION_MAX", "number": 2147483647 }] }, { "name": "SymbolVisibility", "value": [{ "name": "VISIBILITY_UNSET", "number": 0 }, { "name": "VISIBILITY_LOCAL", "number": 1 }, { "name": "VISIBILITY_EXPORT", "number": 2 }] }] });
var FileDescriptorProtoSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_descriptor, 1);
var ExtensionRangeOptions_VerificationState;
(function(ExtensionRangeOptions_VerificationState2) {
  ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["DECLARATION"] = 0] = "DECLARATION";
  ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["UNVERIFIED"] = 1] = "UNVERIFIED";
})(ExtensionRangeOptions_VerificationState || (ExtensionRangeOptions_VerificationState = {}));
var FieldDescriptorProto_Type;
(function(FieldDescriptorProto_Type2) {
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["DOUBLE"] = 1] = "DOUBLE";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FLOAT"] = 2] = "FLOAT";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT64"] = 3] = "INT64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT64"] = 4] = "UINT64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT32"] = 5] = "INT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED64"] = 6] = "FIXED64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED32"] = 7] = "FIXED32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BOOL"] = 8] = "BOOL";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["STRING"] = 9] = "STRING";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["GROUP"] = 10] = "GROUP";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["MESSAGE"] = 11] = "MESSAGE";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BYTES"] = 12] = "BYTES";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT32"] = 13] = "UINT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["ENUM"] = 14] = "ENUM";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED32"] = 15] = "SFIXED32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED64"] = 16] = "SFIXED64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT32"] = 17] = "SINT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT64"] = 18] = "SINT64";
})(FieldDescriptorProto_Type || (FieldDescriptorProto_Type = {}));
var FieldDescriptorProto_Label;
(function(FieldDescriptorProto_Label2) {
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["OPTIONAL"] = 1] = "OPTIONAL";
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REPEATED"] = 3] = "REPEATED";
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REQUIRED"] = 2] = "REQUIRED";
})(FieldDescriptorProto_Label || (FieldDescriptorProto_Label = {}));
var FileOptions_OptimizeMode;
(function(FileOptions_OptimizeMode2) {
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["SPEED"] = 1] = "SPEED";
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["CODE_SIZE"] = 2] = "CODE_SIZE";
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
})(FileOptions_OptimizeMode || (FileOptions_OptimizeMode = {}));
var FieldOptions_CType;
(function(FieldOptions_CType2) {
  FieldOptions_CType2[FieldOptions_CType2["STRING"] = 0] = "STRING";
  FieldOptions_CType2[FieldOptions_CType2["CORD"] = 1] = "CORD";
  FieldOptions_CType2[FieldOptions_CType2["STRING_PIECE"] = 2] = "STRING_PIECE";
})(FieldOptions_CType || (FieldOptions_CType = {}));
var FieldOptions_JSType;
(function(FieldOptions_JSType2) {
  FieldOptions_JSType2[FieldOptions_JSType2["JS_NORMAL"] = 0] = "JS_NORMAL";
  FieldOptions_JSType2[FieldOptions_JSType2["JS_STRING"] = 1] = "JS_STRING";
  FieldOptions_JSType2[FieldOptions_JSType2["JS_NUMBER"] = 2] = "JS_NUMBER";
})(FieldOptions_JSType || (FieldOptions_JSType = {}));
var FieldOptions_OptionRetention;
(function(FieldOptions_OptionRetention2) {
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_UNKNOWN"] = 0] = "RETENTION_UNKNOWN";
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_RUNTIME"] = 1] = "RETENTION_RUNTIME";
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_SOURCE"] = 2] = "RETENTION_SOURCE";
})(FieldOptions_OptionRetention || (FieldOptions_OptionRetention = {}));
var FieldOptions_OptionTargetType;
(function(FieldOptions_OptionTargetType2) {
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_UNKNOWN"] = 0] = "TARGET_TYPE_UNKNOWN";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FILE"] = 1] = "TARGET_TYPE_FILE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_EXTENSION_RANGE"] = 2] = "TARGET_TYPE_EXTENSION_RANGE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_MESSAGE"] = 3] = "TARGET_TYPE_MESSAGE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FIELD"] = 4] = "TARGET_TYPE_FIELD";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ONEOF"] = 5] = "TARGET_TYPE_ONEOF";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM"] = 6] = "TARGET_TYPE_ENUM";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM_ENTRY"] = 7] = "TARGET_TYPE_ENUM_ENTRY";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_SERVICE"] = 8] = "TARGET_TYPE_SERVICE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_METHOD"] = 9] = "TARGET_TYPE_METHOD";
})(FieldOptions_OptionTargetType || (FieldOptions_OptionTargetType = {}));
var MethodOptions_IdempotencyLevel;
(function(MethodOptions_IdempotencyLevel2) {
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENT"] = 2] = "IDEMPOTENT";
})(MethodOptions_IdempotencyLevel || (MethodOptions_IdempotencyLevel = {}));
var FeatureSet_VisibilityFeature_DefaultSymbolVisibility;
(function(FeatureSet_VisibilityFeature_DefaultSymbolVisibility2) {
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["DEFAULT_SYMBOL_VISIBILITY_UNKNOWN"] = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN";
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["EXPORT_ALL"] = 1] = "EXPORT_ALL";
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["EXPORT_TOP_LEVEL"] = 2] = "EXPORT_TOP_LEVEL";
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["LOCAL_ALL"] = 3] = "LOCAL_ALL";
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["STRICT"] = 4] = "STRICT";
})(FeatureSet_VisibilityFeature_DefaultSymbolVisibility || (FeatureSet_VisibilityFeature_DefaultSymbolVisibility = {}));
var FeatureSet_ProtoLimitsFeature_EnforceProtoLimits;
(function(FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2) {
  FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2[FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2["PROTO_LIMITS_UNKNOWN"] = 0] = "PROTO_LIMITS_UNKNOWN";
  FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2[FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2["LEGACY_NO_EXPLICIT_LIMITS"] = 1] = "LEGACY_NO_EXPLICIT_LIMITS";
  FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2[FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2["PROTO_LIMITS2026"] = 2] = "PROTO_LIMITS2026";
})(FeatureSet_ProtoLimitsFeature_EnforceProtoLimits || (FeatureSet_ProtoLimitsFeature_EnforceProtoLimits = {}));
var FeatureSet_FieldPresence;
(function(FeatureSet_FieldPresence2) {
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["FIELD_PRESENCE_UNKNOWN"] = 0] = "FIELD_PRESENCE_UNKNOWN";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["EXPLICIT"] = 1] = "EXPLICIT";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["IMPLICIT"] = 2] = "IMPLICIT";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["LEGACY_REQUIRED"] = 3] = "LEGACY_REQUIRED";
})(FeatureSet_FieldPresence || (FeatureSet_FieldPresence = {}));
var FeatureSet_EnumType;
(function(FeatureSet_EnumType2) {
  FeatureSet_EnumType2[FeatureSet_EnumType2["ENUM_TYPE_UNKNOWN"] = 0] = "ENUM_TYPE_UNKNOWN";
  FeatureSet_EnumType2[FeatureSet_EnumType2["OPEN"] = 1] = "OPEN";
  FeatureSet_EnumType2[FeatureSet_EnumType2["CLOSED"] = 2] = "CLOSED";
})(FeatureSet_EnumType || (FeatureSet_EnumType = {}));
var FeatureSet_RepeatedFieldEncoding;
(function(FeatureSet_RepeatedFieldEncoding2) {
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["REPEATED_FIELD_ENCODING_UNKNOWN"] = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN";
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["PACKED"] = 1] = "PACKED";
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["EXPANDED"] = 2] = "EXPANDED";
})(FeatureSet_RepeatedFieldEncoding || (FeatureSet_RepeatedFieldEncoding = {}));
var FeatureSet_Utf8Validation;
(function(FeatureSet_Utf8Validation2) {
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["UTF8_VALIDATION_UNKNOWN"] = 0] = "UTF8_VALIDATION_UNKNOWN";
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["VERIFY"] = 2] = "VERIFY";
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["NONE"] = 3] = "NONE";
})(FeatureSet_Utf8Validation || (FeatureSet_Utf8Validation = {}));
var FeatureSet_MessageEncoding;
(function(FeatureSet_MessageEncoding2) {
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["MESSAGE_ENCODING_UNKNOWN"] = 0] = "MESSAGE_ENCODING_UNKNOWN";
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["LENGTH_PREFIXED"] = 1] = "LENGTH_PREFIXED";
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["DELIMITED"] = 2] = "DELIMITED";
})(FeatureSet_MessageEncoding || (FeatureSet_MessageEncoding = {}));
var FeatureSet_JsonFormat;
(function(FeatureSet_JsonFormat2) {
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["JSON_FORMAT_UNKNOWN"] = 0] = "JSON_FORMAT_UNKNOWN";
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["ALLOW"] = 1] = "ALLOW";
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["LEGACY_BEST_EFFORT"] = 2] = "LEGACY_BEST_EFFORT";
})(FeatureSet_JsonFormat || (FeatureSet_JsonFormat = {}));
var FeatureSet_EnforceNamingStyle;
(function(FeatureSet_EnforceNamingStyle2) {
  FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["ENFORCE_NAMING_STYLE_UNKNOWN"] = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN";
  FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE2024"] = 1] = "STYLE2024";
  FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE_LEGACY"] = 2] = "STYLE_LEGACY";
  FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE2026"] = 3] = "STYLE2026";
})(FeatureSet_EnforceNamingStyle || (FeatureSet_EnforceNamingStyle = {}));
var GeneratedCodeInfo_Annotation_Semantic;
(function(GeneratedCodeInfo_Annotation_Semantic2) {
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["NONE"] = 0] = "NONE";
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["SET"] = 1] = "SET";
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["ALIAS"] = 2] = "ALIAS";
})(GeneratedCodeInfo_Annotation_Semantic || (GeneratedCodeInfo_Annotation_Semantic = {}));
var Edition;
(function(Edition2) {
  Edition2[Edition2["EDITION_UNKNOWN"] = 0] = "EDITION_UNKNOWN";
  Edition2[Edition2["EDITION_LEGACY"] = 900] = "EDITION_LEGACY";
  Edition2[Edition2["EDITION_PROTO2"] = 998] = "EDITION_PROTO2";
  Edition2[Edition2["EDITION_PROTO3"] = 999] = "EDITION_PROTO3";
  Edition2[Edition2["EDITION_2023"] = 1e3] = "EDITION_2023";
  Edition2[Edition2["EDITION_2024"] = 1001] = "EDITION_2024";
  Edition2[Edition2["EDITION_2026"] = 1002] = "EDITION_2026";
  Edition2[Edition2["EDITION_UNSTABLE"] = 9999] = "EDITION_UNSTABLE";
  Edition2[Edition2["EDITION_1_TEST_ONLY"] = 1] = "EDITION_1_TEST_ONLY";
  Edition2[Edition2["EDITION_2_TEST_ONLY"] = 2] = "EDITION_2_TEST_ONLY";
  Edition2[Edition2["EDITION_99997_TEST_ONLY"] = 99997] = "EDITION_99997_TEST_ONLY";
  Edition2[Edition2["EDITION_99998_TEST_ONLY"] = 99998] = "EDITION_99998_TEST_ONLY";
  Edition2[Edition2["EDITION_99999_TEST_ONLY"] = 99999] = "EDITION_99999_TEST_ONLY";
  Edition2[Edition2["EDITION_MAX"] = 2147483647] = "EDITION_MAX";
})(Edition || (Edition = {}));
var SymbolVisibility;
(function(SymbolVisibility2) {
  SymbolVisibility2[SymbolVisibility2["VISIBILITY_UNSET"] = 0] = "VISIBILITY_UNSET";
  SymbolVisibility2[SymbolVisibility2["VISIBILITY_LOCAL"] = 1] = "VISIBILITY_LOCAL";
  SymbolVisibility2[SymbolVisibility2["VISIBILITY_EXPORT"] = 2] = "VISIBILITY_EXPORT";
})(SymbolVisibility || (SymbolVisibility = {}));

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
function makeReadContext(options) {
  return Object.assign(Object.assign({ readUnknownFields: true, recursionLimit: 100 }, options), { depth: 0 });
}
function fromBinary(schema, bytes, options) {
  const message = create(schema);
  compiledReader(schema).read(message, new BinaryReader(bytes), makeReadContext(options), bytes.byteLength);
  return message;
}
var compiledReaders = /* @__PURE__ */ new WeakMap();
function compiledReader(desc) {
  let compiled = compiledReaders.get(desc);
  if (compiled === void 0) {
    compiled = compileMessage(desc);
  }
  return compiled;
}
function compileMessage(desc) {
  const descString = String(desc);
  const fieldReaders = /* @__PURE__ */ new Map();
  const compiled = {
    read: compileMessageReader(descString, fieldReaders),
    readGroup: compileGroupReader(descString, fieldReaders)
  };
  compiledReaders.set(desc, compiled);
  for (const field of desc.fields) {
    fieldReaders.set(field.number, compileFieldReader(field));
  }
  return compiled;
}
function compileMessageReader(descString, fieldReaders) {
  return (message, reader, ctx, length) => {
    var _a;
    if (++ctx.depth > ctx.recursionLimit) {
      throw new Error(`cannot decode ${descString} from binary: maximum recursion depth of ${ctx.recursionLimit} reached`);
    }
    const end = reader.pos + length;
    const unknownFields = (_a = message.$unknown) !== null && _a !== void 0 ? _a : [];
    while (reader.pos < end) {
      const [fieldNo, wireType] = reader.tag();
      const fieldReader = fieldReaders.get(fieldNo);
      if (fieldReader === void 0) {
        const data = reader.skip(wireType, fieldNo, ctx.recursionLimit - ctx.depth);
        if (ctx.readUnknownFields) {
          unknownFields.push({ no: fieldNo, wireType, data });
        }
        continue;
      }
      fieldReader(message, reader, ctx, wireType);
    }
    if (unknownFields.length > 0) {
      message.$unknown = unknownFields;
    }
    ctx.depth--;
  };
}
function compileGroupReader(descString, fieldReaders) {
  return (message, reader, ctx, fieldNo) => {
    var _a;
    if (++ctx.depth > ctx.recursionLimit) {
      throw new Error(`cannot decode ${descString} from binary: maximum recursion depth of ${ctx.recursionLimit} reached`);
    }
    let recordFieldNo;
    let wireType;
    const unknownFields = (_a = message.$unknown) !== null && _a !== void 0 ? _a : [];
    while (reader.pos < reader.len) {
      [recordFieldNo, wireType] = reader.tag();
      if (wireType == WireType.EndGroup) {
        break;
      }
      const fieldReader = fieldReaders.get(recordFieldNo);
      if (fieldReader === void 0) {
        const data = reader.skip(wireType, recordFieldNo, ctx.recursionLimit - ctx.depth);
        if (ctx.readUnknownFields) {
          unknownFields.push({ no: recordFieldNo, wireType, data });
        }
        continue;
      }
      fieldReader(message, reader, ctx, wireType);
    }
    if (wireType != WireType.EndGroup || recordFieldNo !== fieldNo) {
      throw new Error("invalid end group tag");
    }
    if (unknownFields.length > 0) {
      message.$unknown = unknownFields;
    }
    ctx.depth--;
  };
}
function compileFieldReader(field) {
  switch (field.fieldKind) {
    case "scalar":
      return compileScalarFieldReader(field);
    case "enum":
      return compileEnumFieldReader(field);
    case "message":
      return compileMessageFieldReader(field);
    case "list":
      return compileListFieldReader(field);
    case "map":
      return compileMapFieldReader(field);
  }
}
function compileScalarFieldReader(field) {
  const readScalar = compileScalarReader(field.scalar, field.utf8Validation, field.longAsString);
  const localName = field.localName;
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    return (message, reader) => {
      message[oneofLocalName] = {
        case: localName,
        value: readScalar(reader)
      };
    };
  }
  return (message, reader) => {
    message[localName] = readScalar(reader);
  };
}
function compileEnumFieldReader(field) {
  var _a;
  const localName = field.localName;
  const oneofLocalName = (_a = field.oneof) === null || _a === void 0 ? void 0 : _a.localName;
  if (field.enum.open) {
    if (oneofLocalName !== void 0) {
      return (message, reader) => {
        message[oneofLocalName] = { case: localName, value: reader.int32() };
      };
    }
    return (message, reader) => {
      message[localName] = reader.int32();
    };
  }
  const values = field.enum.values;
  const fieldNo = field.number;
  return (message, reader, ctx, wireType) => {
    var _a2;
    const val = reader.int32();
    if (values.some((v) => v.number === val)) {
      if (oneofLocalName !== void 0) {
        message[oneofLocalName] = { case: localName, value: val };
      } else {
        message[localName] = val;
      }
    } else if (ctx.readUnknownFields) {
      const bytes = [];
      varint32write(val, bytes);
      const unknownFields = (_a2 = message.$unknown) !== null && _a2 !== void 0 ? _a2 : [];
      unknownFields.push({
        no: fieldNo,
        wireType,
        data: new Uint8Array(bytes)
      });
      message.$unknown = unknownFields;
    }
  };
}
function compileMessageFieldReader(field) {
  const localName = field.localName;
  const { toMessage, toLocal } = localMessageMapper(field);
  const readChild = compileChildReader(field);
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    return (message, reader, ctx) => {
      const oneof = message[oneofLocalName];
      const child = toMessage(oneof.case === localName ? oneof.value : void 0);
      readChild(child, reader, ctx);
      message[oneofLocalName] = { case: localName, value: toLocal(child) };
    };
  }
  return (message, reader, ctx) => {
    const child = toMessage(message[localName]);
    readChild(child, reader, ctx);
    message[localName] = toLocal(child);
  };
}
function compileChildReader(field) {
  const compiledChild = compiledReader(field.message);
  if (field.delimitedEncoding) {
    const fieldNo = field.number;
    return (child, reader, ctx) => compiledChild.readGroup(child, reader, ctx, fieldNo);
  }
  return (child, reader, ctx) => compiledChild.read(child, reader, ctx, reader.uint32());
}
function compileListFieldReader(field) {
  const localName = field.localName;
  if (field.listKind == "message") {
    const { toMessage, toLocal } = localMessageMapper(field);
    const readChild = compileChildReader(field);
    return (message, reader, ctx) => {
      const child = toMessage(void 0);
      readChild(child, reader, ctx);
      message[localName].push(toLocal(child));
    };
  }
  const scalarType = field.listKind == "enum" ? ScalarType.INT32 : field.scalar;
  const longAsString = field.listKind == "scalar" ? field.longAsString : false;
  const readScalar = compileScalarReader(scalarType, field.utf8Validation, longAsString);
  const packedPossible = scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES;
  return (message, reader, ctx, wireType) => {
    const items = message[localName];
    if (wireType == WireType.LengthDelimited && packedPossible) {
      const end = reader.uint32() + reader.pos;
      while (reader.pos < end) {
        items.push(readScalar(reader));
      }
    } else {
      items.push(readScalar(reader));
    }
  };
}
function compileMapFieldReader(field) {
  const localName = field.localName;
  const readKey = compileScalarReader(field.mapKey, field.utf8Validation, false);
  const keyZero = scalarZeroValue(field.mapKey, false);
  let readValue;
  let valueDefault;
  switch (field.mapKind) {
    case "scalar": {
      const scalar = field.scalar;
      const readScalar = compileScalarReader(scalar, field.utf8Validation, false);
      readValue = (reader) => readScalar(reader);
      if (scalar == ScalarType.BYTES) {
        valueDefault = () => new Uint8Array(0);
      } else {
        const zero = scalarZeroValue(scalar, false);
        valueDefault = () => zero;
      }
      break;
    }
    case "enum": {
      const zero = field.enum.values[0].number;
      readValue = (reader) => reader.int32();
      valueDefault = () => zero;
      break;
    }
    case "message": {
      const { toMessage, toLocal } = localMessageMapper(field);
      const readChild = compiledReader(field.message).read;
      readValue = (reader, ctx, existing) => {
        const child = toMessage(existing);
        readChild(child, reader, ctx, reader.uint32());
        return toLocal(child);
      };
      valueDefault = () => toLocal(toMessage(void 0));
      break;
    }
  }
  return (message, reader, ctx) => {
    const record = message[localName];
    let key2;
    let val;
    const len = reader.uint32();
    const end = reader.pos + len;
    while (reader.pos < end) {
      const [fieldNo] = reader.tag();
      switch (fieldNo) {
        case 1:
          key2 = readKey(reader);
          break;
        case 2:
          val = readValue(reader, ctx, val);
          break;
      }
    }
    if (key2 === void 0) {
      key2 = keyZero;
    }
    if (val === void 0) {
      val = valueDefault();
    }
    setOwn(record, key2, val);
  };
}
function compileScalarReader(type, utf8Validation, longAsString) {
  switch (type) {
    case ScalarType.STRING:
      return (reader) => reader.string(utf8Validation);
    case ScalarType.BOOL:
      return (reader) => reader.bool();
    case ScalarType.DOUBLE:
      return (reader) => reader.double();
    case ScalarType.FLOAT:
      return (reader) => reader.float();
    case ScalarType.INT32:
      return (reader) => reader.int32();
    case ScalarType.INT64:
      if (longAsString) {
        return (reader) => String(reader.int64());
      }
      return (reader) => reader.int64();
    case ScalarType.UINT64:
      if (longAsString) {
        return (reader) => String(reader.uint64());
      }
      return (reader) => reader.uint64();
    case ScalarType.FIXED64:
      if (longAsString) {
        return (reader) => String(reader.fixed64());
      }
      return (reader) => reader.fixed64();
    case ScalarType.BYTES:
      return (reader) => reader.bytes();
    case ScalarType.FIXED32:
      return (reader) => reader.fixed32();
    case ScalarType.SFIXED32:
      return (reader) => reader.sfixed32();
    case ScalarType.SFIXED64:
      if (longAsString) {
        return (reader) => String(reader.sfixed64());
      }
      return (reader) => reader.sfixed64();
    case ScalarType.SINT64:
      if (longAsString) {
        return (reader) => String(reader.sint64());
      }
      return (reader) => reader.sint64();
    case ScalarType.UINT32:
      return (reader) => reader.uint32();
    case ScalarType.SINT32:
      return (reader) => reader.sint32();
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/file.js
function fileDesc(b64, imports) {
  var _a;
  const root = fromBinary(FileDescriptorProtoSchema, base64Decode(b64));
  root.messageType.forEach(restoreJsonNames);
  root.dependency = (_a = imports === null || imports === void 0 ? void 0 : imports.map((f) => f.proto.name)) !== null && _a !== void 0 ? _a : [];
  const reg = createFileRegistry(root, (protoFileName) => imports === null || imports === void 0 ? void 0 : imports.find((f) => f.proto.name === protoFileName));
  return reg.getFile(root.name);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wkt/google/protobuf/timestamp_pb.js
var file_google_protobuf_timestamp = /* @__PURE__ */ fileDesc("Ch9nb29nbGUvcHJvdG9idWYvdGltZXN0YW1wLnByb3RvEg9nb29nbGUucHJvdG9idWYiKwoJVGltZXN0YW1wEg8KB3NlY29uZHMYASABKAMSDQoFbmFub3MYAiABKAVChQEKE2NvbS5nb29nbGUucHJvdG9idWZCDlRpbWVzdGFtcFByb3RvUAFaMmdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3RpbWVzdGFtcHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");
var TimestampSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_timestamp, 0);

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wkt/timestamp.js
function timestampFromDate(date) {
  return timestampFromMs(date.getTime());
}
function timestampFromMs(timestampMs2) {
  const seconds = Math.floor(timestampMs2 / 1e3);
  return create(TimestampSchema, {
    seconds: protoInt64.parse(seconds),
    nanos: (timestampMs2 - seconds * 1e3) * 1e6
  });
}
function timestampMs(timestamp) {
  return Number(timestamp.seconds) * 1e3 + Math.round(timestamp.nanos / 1e6);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/wkt/google/protobuf/duration_pb.js
var file_google_protobuf_duration = /* @__PURE__ */ fileDesc("Ch5nb29nbGUvcHJvdG9idWYvZHVyYXRpb24ucHJvdG8SD2dvb2dsZS5wcm90b2J1ZiIqCghEdXJhdGlvbhIPCgdzZWNvbmRzGAEgASgDEg0KBW5hbm9zGAIgASgFQoMBChNjb20uZ29vZ2xlLnByb3RvYnVmQg1EdXJhdGlvblByb3RvUAFaMWdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2R1cmF0aW9ucGL4AQGiAgNHUEKqAh5Hb29nbGUuUHJvdG9idWYuV2VsbEtub3duVHlwZXNiBnByb3RvMw");

// node_modules/.pnpm/@bufbuild+protobuf@2.16.0/node_modules/@bufbuild/protobuf/dist/esm/to-binary.js
var IMPLICIT3 = 2;
var LEGACY_REQUIRED2 = 3;
var writeDefaults = {
  writeUnknownFields: true
};
function makeWriteOptions(options) {
  return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function toBinary(schema, message, options) {
  const writer = new BinaryWriter();
  compiledWriter(schema)(writer, makeWriteOptions(options), message);
  return writer.finish();
}
var compiledWriters = /* @__PURE__ */ new WeakMap();
function compiledWriter(desc) {
  let compiled = compiledWriters.get(desc);
  if (compiled === void 0) {
    compiled = compileMessage2(desc);
  }
  return compiled;
}
function compileMessage2(desc) {
  const typeName = desc.typeName;
  const sortedFields = desc.fields.concat().sort((a, b) => a.number - b.number);
  const foreignField = sortedFields[0];
  const fieldWriters = [];
  const compiled = (writer, opts, message) => {
    if (message.$typeName !== typeName && foreignField !== void 0) {
      throw new FieldError(foreignField, `cannot use ${foreignField} with message ${message.$typeName}`, "ForeignFieldError");
    }
    for (let i = 0; i < fieldWriters.length; i++) {
      fieldWriters[i](writer, opts, message);
    }
    const unknown = message.$unknown;
    if (unknown !== void 0 && opts.writeUnknownFields) {
      for (let i = 0; i < unknown.length; i++) {
        const { no, wireType, data } = unknown[i];
        writer.tag(no, wireType).raw(data);
      }
    }
  };
  compiledWriters.set(desc, compiled);
  for (const field of sortedFields) {
    fieldWriters.push(compileField(field));
  }
  return compiled;
}
function compileField(field) {
  switch (field.fieldKind) {
    case "message":
    case "scalar":
    case "enum":
      return compileSingularField(field);
    case "list":
      return compileListField(field);
    case "map":
      return compileMapField(field);
  }
}
function compileSingularField(field) {
  const writeValue = compileSingularValue(field);
  const localName = field.localName;
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    return (writer, opts, message) => {
      const oneof = message[oneofLocalName];
      if (oneof.case === localName) {
        writeValue(writer, opts, oneof.value);
      }
    };
  }
  if (field.presence != IMPLICIT3) {
    const requiredError = field.presence == LEGACY_REQUIRED2 ? `cannot encode ${field} to binary: required field not set` : void 0;
    return (writer, opts, message) => {
      const value = message[localName];
      if (value !== void 0 && Object.prototype.hasOwnProperty.call(message, localName)) {
        writeValue(writer, opts, value);
      } else if (requiredError !== void 0) {
        throw new Error(requiredError);
      }
    };
  }
  if (field.fieldKind == "enum") {
    const zero = field.enum.values[0].number;
    return (writer, opts, message) => {
      const value = message[localName];
      if (value !== zero) {
        writeValue(writer, opts, value);
      }
    };
  }
  switch (field.scalar) {
    case ScalarType.BOOL:
      return (writer, opts, message) => {
        const value = message[localName];
        if (value !== false) {
          writeValue(writer, opts, value);
        }
      };
    case ScalarType.STRING:
      return (writer, opts, message) => {
        const value = message[localName];
        if (value !== "") {
          writeValue(writer, opts, value);
        }
      };
    case ScalarType.BYTES:
      return (writer, opts, message) => {
        const value = message[localName];
        if (!(value instanceof Uint8Array) || value.byteLength > 0) {
          writeValue(writer, opts, value);
        }
      };
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return (writer, opts, message) => {
        const value = message[localName];
        if (!Object.is(value, 0)) {
          writeValue(writer, opts, value);
        }
      };
    default:
      return (writer, opts, message) => {
        const value = message[localName];
        if (value != 0) {
          writeValue(writer, opts, value);
        }
      };
  }
}
function compileSingularValue(field) {
  switch (field.fieldKind) {
    case "message": {
      const { toMessage } = localMessageMapper(field);
      const writeChild = compileChildWriter(field);
      return (writer, opts, value) => {
        writeChild(writer, opts, toMessage(value));
      };
    }
    case "scalar":
    case "enum": {
      const scalarType = field.fieldKind == "enum" ? ScalarType.INT32 : field.scalar;
      const fieldNo = field.number;
      const wireType = writeTypeOfScalar(scalarType);
      const writeScalar = compileScalarValue(scalarType, field.parent.typeName, field.name);
      return (writer, opts, value) => {
        writer.tag(fieldNo, wireType);
        writeScalar(writer, value);
      };
    }
  }
}
function compileListField(field) {
  const localName = field.localName;
  const fieldNo = field.number;
  switch (field.listKind) {
    case "message": {
      const { toMessage } = localMessageMapper(field);
      const writeChild = compileChildWriter(field);
      return (writer, opts, message) => {
        const items = message[localName];
        for (let i = 0; i < items.length; i++) {
          writeChild(writer, opts, toMessage(items[i]));
        }
      };
    }
    case "scalar":
    case "enum": {
      const scalarType = field.listKind == "enum" ? ScalarType.INT32 : field.scalar;
      const writeScalar = compileScalarValue(scalarType, field.parent.typeName, field.name);
      if (field.packed) {
        return (writer, opts, message) => {
          const items = message[localName];
          if (items.length == 0) {
            return;
          }
          writer.tag(fieldNo, WireType.LengthDelimited).fork();
          for (let i = 0; i < items.length; i++) {
            writeScalar(writer, items[i]);
          }
          writer.join();
        };
      }
      const wireType = writeTypeOfScalar(scalarType);
      return (writer, opts, message) => {
        const items = message[localName];
        for (let i = 0; i < items.length; i++) {
          writer.tag(fieldNo, wireType);
          writeScalar(writer, items[i]);
        }
      };
    }
  }
}
function compileMapField(field) {
  const localName = field.localName;
  const fieldNo = field.number;
  const writeKey = compileMapKey(field);
  if (field.mapKind == "message") {
    const { toMessage } = localMessageMapper(field);
    const writeMessage = compiledWriter(field.message);
    return (writer, opts, message) => {
      const record = message[localName];
      const keys = Object.keys(record);
      for (let i = 0; i < keys.length; i++) {
        const key2 = keys[i];
        writer.tag(fieldNo, WireType.LengthDelimited).fork();
        writeKey(writer, key2);
        writer.tag(2, WireType.LengthDelimited).fork();
        writeMessage(writer, opts, toMessage(record[key2]));
        writer.join();
        writer.join();
      }
    };
  }
  const scalarType = field.mapKind == "enum" ? ScalarType.INT32 : field.scalar;
  const valueWireType = writeTypeOfScalar(scalarType);
  const writeScalar = compileScalarValue(scalarType, field.parent.typeName, field.name);
  return (writer, opts, message) => {
    const record = message[localName];
    const keys = Object.keys(record);
    for (let i = 0; i < keys.length; i++) {
      const key2 = keys[i];
      writer.tag(fieldNo, WireType.LengthDelimited).fork();
      writeKey(writer, key2);
      writer.tag(2, valueWireType);
      writeScalar(writer, record[key2]);
      writer.join();
    }
  };
}
function compileMapKey(field) {
  const wireType = writeTypeOfScalar(field.mapKey);
  const writeScalar = compileScalarValue(field.mapKey, field.parent.typeName, field.name);
  const convertKey = compileMapKeyConverter(field.mapKey);
  return (writer, key2) => {
    writer.tag(1, wireType);
    writeScalar(writer, convertKey(key2));
  };
}
function compileMapKeyConverter(type) {
  switch (type) {
    case ScalarType.STRING:
      return (key2) => key2;
    case ScalarType.BOOL:
      return (key2) => key2 === "true" ? true : key2 === "false" ? false : key2;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return (key2) => {
        try {
          return protoInt64.uParse(key2);
        } catch (_a) {
          return key2;
        }
      };
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return (key2) => {
        try {
          return protoInt64.parse(key2);
        } catch (_a) {
          return key2;
        }
      };
    default:
      return (key2) => {
        const n = Number.parseInt(key2);
        return Number.isFinite(n) ? n : key2;
      };
  }
}
function compileScalarValue(type, messageName, fieldName) {
  const writeScalar = compileScalarWrite(type);
  return (writer, value) => {
    try {
      writeScalar(writer, value);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`cannot encode field ${messageName}.${fieldName} to binary: ${e.message}`);
      }
      throw e;
    }
  };
}
function compileScalarWrite(type) {
  switch (type) {
    case ScalarType.STRING:
      return (writer, value) => writer.string(value);
    case ScalarType.BOOL:
      return (writer, value) => writer.bool(value);
    case ScalarType.DOUBLE:
      return (writer, value) => writer.double(value);
    case ScalarType.FLOAT:
      return (writer, value) => writer.float(value);
    case ScalarType.INT32:
      return (writer, value) => writer.int32(value);
    case ScalarType.INT64:
      return (writer, value) => writer.int64(value);
    case ScalarType.UINT64:
      return (writer, value) => writer.uint64(value);
    case ScalarType.FIXED64:
      return (writer, value) => writer.fixed64(value);
    case ScalarType.BYTES:
      return (writer, value) => writer.bytes(value);
    case ScalarType.FIXED32:
      return (writer, value) => writer.fixed32(value);
    case ScalarType.SFIXED32:
      return (writer, value) => writer.sfixed32(value);
    case ScalarType.SFIXED64:
      return (writer, value) => writer.sfixed64(value);
    case ScalarType.SINT64:
      return (writer, value) => writer.sint64(value);
    case ScalarType.UINT32:
      return (writer, value) => writer.uint32(value);
    case ScalarType.SINT32:
      return (writer, value) => writer.sint32(value);
  }
}
function compileChildWriter(field) {
  const fieldNo = field.number;
  const writeMessage = compiledWriter(field.message);
  if (field.delimitedEncoding) {
    return (writer, opts, child) => {
      writer.tag(fieldNo, WireType.StartGroup);
      writeMessage(writer, opts, child);
      writer.tag(fieldNo, WireType.EndGroup);
    };
  }
  return (writer, opts, child) => {
    writer.tag(fieldNo, WireType.LengthDelimited).fork();
    writeMessage(writer, opts, child);
    writer.join();
  };
}
function writeTypeOfScalar(type) {
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      return WireType.LengthDelimited;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      return WireType.Bit64;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      return WireType.Bit32;
    default:
      return WireType.Varint;
  }
}

// node_modules/.pnpm/ws@8.22.0/node_modules/ws/wrapper.mjs
var import_stream = __toESM(require_stream(), 1);
var import_extension = __toESM(require_extension(), 1);
var import_permessage_deflate = __toESM(require_permessage_deflate(), 1);
var import_receiver = __toESM(require_receiver(), 1);
var import_sender = __toESM(require_sender(), 1);
var import_subprotocol = __toESM(require_subprotocol(), 1);
var import_websocket = __toESM(require_websocket(), 1);
var import_websocket_server = __toESM(require_websocket_server(), 1);
var wrapper_default = import_websocket.default;

// protocol/gen/pirc/v1alpha1/common_pb.ts
var file_pirc_v1alpha1_common = /* @__PURE__ */ fileDesc("ChpwaXJjL3YxYWxwaGExL2NvbW1vbi5wcm90bxINcGlyYy52MWFscGhhMSJHCgpTZXNzaW9uUmVmEhAKCGhvc3Rfa2V5GAEgASgMEhIKCnNlc3Npb25faWQYAiABKAkSEwoLaW5zdGFuY2VfaWQYAyABKAkiVAoFRXJyb3ISJgoEY29kZRgBIAEoDjIYLnBpcmMudjFhbHBoYTEuRXJyb3JDb2RlEg8KB21lc3NhZ2UYAiABKAkSEgoKcmVxdWVzdF9pZBgDIAEoCSq6AwoJRXJyb3JDb2RlEhoKFkVSUk9SX0NPREVfVU5TUEVDSUZJRUQQABIeChpFUlJPUl9DT0RFX1VOQVVUSEVOVElDQVRFRBABEiAKHEVSUk9SX0NPREVfUEVSTUlTU0lPTl9ERU5JRUQQAhIiCh5FUlJPUl9DT0RFX1ZFUlNJT05fVU5TVVBQT1JURUQQAxIWChJFUlJPUl9DT0RFX0lOVkFMSUQQBBIYChRFUlJPUl9DT0RFX1RPT19MQVJHRRAFEiAKHEVSUk9SX0NPREVfU0VTU0lPTl9OT1RfRk9VTkQQBhIbChdFUlJPUl9DT0RFX1NFU1NJT05fR09ORRAHEhMKD0VSUk9SX0NPREVfQlVTWRAIEhYKEkVSUk9SX0NPREVfVElNRU9VVBAJEhwKGEVSUk9SX0NPREVfVE9LRU5fSU5WQUxJRBAKEhsKF0VSUk9SX0NPREVfUkFURV9MSU1JVEVEEAsSFwoTRVJST1JfQ09ERV9JTlRFUk5BTBAMEhgKFEVSUk9SX0NPREVfUElfRkFJTEVEEA0SHwobRVJST1JfQ09ERV9BUFBST1ZBTF9QRU5ESU5HEA5CrAEKEWNvbS5waXJjLnYxYWxwaGExQgtDb21tb25Qcm90b1ABWjVwaXJjLmRldi9yZWxheS9pbnRlcm5hbC9wYi9waXJjL3YxYWxwaGExO3BpcmN2MWFscGhhMaICA1BYWKoCDVBpcmMuVjFhbHBoYTHKAg1QaXJjXFYxYWxwaGEx4gIZUGlyY1xWMWFscGhhMVxHUEJNZXRhZGF0YeoCDlBpcmM6OlYxYWxwaGExYgZwcm90bzM");

// protocol/gen/pirc/v1alpha1/relay_pb.ts
var file_pirc_v1alpha1_relay = /* @__PURE__ */ fileDesc("ChlwaXJjL3YxYWxwaGExL3JlbGF5LnByb3RvEg1waXJjLnYxYWxwaGExIugLCgVGcmFtZRIlCgVoZWxsbxgBIAEoCzIULnBpcmMudjFhbHBoYTEuSGVsbG9IABItCgljaGFsbGVuZ2UYAiABKAsyGC5waXJjLnYxYWxwaGExLkNoYWxsZW5nZUgAEiMKBGF1dGgYAyABKAsyEy5waXJjLnYxYWxwaGExLkF1dGhIABIpCgd3ZWxjb21lGAQgASgLMhYucGlyYy52MWFscGhhMS5XZWxjb21lSAASOgoQc2Vzc2lvbl9hbm5vdW5jZRgKIAEoCzIeLnBpcmMudjFhbHBoYTEuU2Vzc2lvbkFubm91bmNlSAASMAoLc2Vzc2lvbl9lbmQYCyABKAsyGS5waXJjLnYxYWxwaGExLlNlc3Npb25FbmRIABI+ChJzdWJzY3JpYmVfc2Vzc2lvbnMYFCABKAsyIC5waXJjLnYxYWxwaGExLlN1YnNjcmliZVNlc3Npb25zSAASJwoGYXR0YWNoGBUgASgLMhUucGlyYy52MWFscGhhMS5BdHRhY2hIABInCgZkZXRhY2gYFiABKAsyFS5waXJjLnYxYWxwaGExLkRldGFjaEgAEj8KE3dhdGNoX3BlbmRpbmdfaG9zdHMYFyABKAsyIC5waXJjLnYxYWxwaGExLldhdGNoUGVuZGluZ0hvc3RzSAASMgoMYXBwcm92ZV9ob3N0GBggASgLMhoucGlyYy52MWFscGhhMS5BcHByb3ZlSG9zdEgAEjAKC3JlamVjdF9ob3N0GBkgASgLMhkucGlyYy52MWFscGhhMS5SZWplY3RIb3N0SAASLgoKd2F0Y2hfa2V5cxgaIAEoCzIYLnBpcmMudjFhbHBoYTEuV2F0Y2hLZXlzSAASLgoKcmVuYW1lX2tleRgbIAEoCzIYLnBpcmMudjFhbHBoYTEuUmVuYW1lS2V5SAASLgoKcmVtb3ZlX2tleRgcIAEoCzIYLnBpcmMudjFhbHBoYTEuUmVtb3ZlS2V5SAASMAoLaXNzdWVfdG9rZW4YHSABKAsyGS5waXJjLnYxYWxwaGExLklzc3VlVG9rZW5IABIyCgxzZXNzaW9uX2xpc3QYHiABKAsyGi5waXJjLnYxYWxwaGExLlNlc3Npb25MaXN0SAASOAoPc2Vzc2lvbl91cGRhdGVkGB8gASgLMh0ucGlyYy52MWFscGhhMS5TZXNzaW9uVXBkYXRlZEgAEjQKDXNlc3Npb25fZW5kZWQYICABKAsyGy5waXJjLnYxYWxwaGExLlNlc3Npb25FbmRlZEgAEjQKDXBlbmRpbmdfaG9zdHMYISABKAsyGy5waXJjLnYxYWxwaGExLlBlbmRpbmdIb3N0c0gAEjIKDGhvc3RfZGVjaWRlZBgiIAEoCzIaLnBpcmMudjFhbHBoYTEuSG9zdERlY2lkZWRIABIjCgRrZXlzGCMgASgLMhMucGlyYy52MWFscGhhMS5LZXlzSAASMAoLa2V5X2NoYW5nZWQYJCABKAsyGS5waXJjLnYxYWxwaGExLktleUNoYW5nZWRIABIyCgx0b2tlbl9pc3N1ZWQYJSABKAsyGi5waXJjLnYxYWxwaGExLlRva2VuSXNzdWVkSAASJwoGcm91dGVkGCggASgLMhUucGlyYy52MWFscGhhMS5Sb3V0ZWRIABI0Cg1yZWdpc3Rlcl9wdXNoGDwgASgLMhsucGlyYy52MWFscGhhMS5SZWdpc3RlclB1c2hIABI4Cg91bnJlZ2lzdGVyX3B1c2gYPSABKAsyHS5waXJjLnYxYWxwaGExLlVucmVnaXN0ZXJQdXNoSAASMgoMcHVzaF9jaGFuZ2VkGD4gASgLMhoucGlyYy52MWFscGhhMS5QdXNoQ2hhbmdlZEgAEjsKEXJlZ2lzdGVyX3JlYWRfa2V5GD8gASgLMh4ucGlyYy52MWFscGhhMS5SZWdpc3RlclJlYWRLZXlIABIlCgVlcnJvchgyIAEoCzIULnBpcmMudjFhbHBoYTEuRXJyb3JIAEIGCgRib2R5IrUBCgVIZWxsbxI4ChBwcm90b2NvbF92ZXJzaW9uGAEgASgOMh4ucGlyYy52MWFscGhhMS5Qcm90b2NvbFZlcnNpb24SIQoEcm9sZRgCIAEoDjITLnBpcmMudjFhbHBoYTEuUm9sZRISCgpwdWJsaWNfa2V5GAMgASgMEhoKEnJlZ2lzdHJhdGlvbl90b2tlbhgEIAEoCRINCgVsYWJlbBgFIAEoCRIQCghzb2Z0d2FyZRgGIAEoCSIaCglDaGFsbGVuZ2USDQoFbm9uY2UYASABKAwiGQoEQXV0aBIRCglzaWduYXR1cmUYASABKAwigQEKB1dlbGNvbWUSOAoQcHJvdG9jb2xfdmVyc2lvbhgBIAEoDjIeLnBpcmMudjFhbHBoYTEuUHJvdG9jb2xWZXJzaW9uEhcKD21heF9mcmFtZV9ieXRlcxgCIAEoDRIQCghzb2Z0d2FyZRgDIAEoCRIRCglyZWFkX29ubHkYBCABKAgiXAoPU2Vzc2lvbkFubm91bmNlEioKB3Nlc3Npb24YASABKAsyGS5waXJjLnYxYWxwaGExLlNlc3Npb25SZWYSDwoHcGF5bG9hZBgCIAEoDBIMCgRwdXNoGAMgASgIIjgKClNlc3Npb25FbmQSKgoHc2Vzc2lvbhgBIAEoCzIZLnBpcmMudjFhbHBoYTEuU2Vzc2lvblJlZiITChFTdWJzY3JpYmVTZXNzaW9ucyI0CgZBdHRhY2gSKgoHc2Vzc2lvbhgBIAEoCzIZLnBpcmMudjFhbHBoYTEuU2Vzc2lvblJlZiI0CgZEZXRhY2gSKgoHc2Vzc2lvbhgBIAEoCzIZLnBpcmMudjFhbHBoYTEuU2Vzc2lvblJlZiKRAQoMU2Vzc2lvbkVudHJ5EioKB3Nlc3Npb24YASABKAsyGS5waXJjLnYxYWxwaGExLlNlc3Npb25SZWYSEgoKaG9zdF9sYWJlbBgCIAEoCRIPCgdwYXlsb2FkGAMgASgMEjAKDGFubm91bmNlZF9hdBgEIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAiSgoLU2Vzc2lvbkxpc3QSLQoIc2Vzc2lvbnMYASADKAsyGy5waXJjLnYxYWxwaGExLlNlc3Npb25FbnRyeRIMCgRtb3JlGAIgASgIIjwKDlNlc3Npb25VcGRhdGVkEioKBWVudHJ5GAEgASgLMhsucGlyYy52MWFscGhhMS5TZXNzaW9uRW50cnkiOgoMU2Vzc2lvbkVuZGVkEioKB3Nlc3Npb24YASABKAsyGS5waXJjLnYxYWxwaGExLlNlc3Npb25SZWYiWQoGUm91dGVkEioKB3Nlc3Npb24YASABKAsyGS5waXJjLnYxYWxwaGExLlNlc3Npb25SZWYSEgoKY2xpZW50X2tleRgCIAEoDBIPCgdwYXlsb2FkGAMgASgMIhMKEVdhdGNoUGVuZGluZ0hvc3RzIoIBCgtQZW5kaW5nSG9zdBISCgpwdWJsaWNfa2V5GAEgASgMEg0KBWxhYmVsGAIgASgJEhAKCHNvZnR3YXJlGAMgASgJEg4KBnJlbW90ZRgEIAEoCRIuCgpmaXJzdF9zZWVuGAUgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcCI5CgxQZW5kaW5nSG9zdHMSKQoFaG9zdHMYASADKAsyGi5waXJjLnYxYWxwaGExLlBlbmRpbmdIb3N0IkQKC0FwcHJvdmVIb3N0EhIKCnJlcXVlc3RfaWQYASABKAkSEgoKcHVibGljX2tleRgCIAEoDBINCgVsYWJlbBgDIAEoCSI0CgpSZWplY3RIb3N0EhIKCnJlcXVlc3RfaWQYASABKAkSEgoKcHVibGljX2tleRgCIAEoDCIhCgtIb3N0RGVjaWRlZBISCgpyZXF1ZXN0X2lkGAEgASgJIgsKCVdhdGNoS2V5cyKzAQoNUmVnaXN0ZXJlZEtleRISCgpwdWJsaWNfa2V5GAEgASgMEiEKBHJvbGUYAiABKA4yEy5waXJjLnYxYWxwaGExLlJvbGUSDQoFbGFiZWwYAyABKAkSLAoIYWRkZWRfYXQYBCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEg4KBm9ubGluZRgFIAEoCBIMCgRwdXNoGAYgASgIEhAKCHJlYWRfa2V5GAcgASgIIjIKBEtleXMSKgoEa2V5cxgBIAMoCzIcLnBpcmMudjFhbHBoYTEuUmVnaXN0ZXJlZEtleSJCCglSZW5hbWVLZXkSEgoKcmVxdWVzdF9pZBgBIAEoCRISCgpwdWJsaWNfa2V5GAIgASgMEg0KBWxhYmVsGAMgASgJIjMKCVJlbW92ZUtleRISCgpyZXF1ZXN0X2lkGAEgASgJEhIKCnB1YmxpY19rZXkYAiABKAwiIAoKS2V5Q2hhbmdlZBISCgpyZXF1ZXN0X2lkGAEgASgJIn8KCklzc3VlVG9rZW4SEgoKcmVxdWVzdF9pZBgBIAEoCRIhCgRyb2xlGAIgASgOMhMucGlyYy52MWFscGhhMS5Sb2xlEg0KBWxhYmVsGAMgASgJEisKCGxpZmV0aW1lGAQgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uImAKC1Rva2VuSXNzdWVkEhIKCnJlcXVlc3RfaWQYASABKAkSDQoFdG9rZW4YAiABKAkSLgoKZXhwaXJlc19hdBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAiMgoMUmVnaXN0ZXJQdXNoEhIKCnJlcXVlc3RfaWQYASABKAkSDgoGaGFuZGxlGAIgASgJIiQKDlVucmVnaXN0ZXJQdXNoEhIKCnJlcXVlc3RfaWQYASABKAkiIQoLUHVzaENoYW5nZWQSEgoKcmVxdWVzdF9pZBgBIAEoCSI5Cg9SZWdpc3RlclJlYWRLZXkSEgoKcmVxdWVzdF9pZBgBIAEoCRISCgpwdWJsaWNfa2V5GAIgASgMKlIKD1Byb3RvY29sVmVyc2lvbhIgChxQUk9UT0NPTF9WRVJTSU9OX1VOU1BFQ0lGSUVEEAASHQoZUFJPVE9DT0xfVkVSU0lPTl9WMUFMUEhBMRABKjwKBFJvbGUSFAoQUk9MRV9VTlNQRUNJRklFRBAAEg0KCVJPTEVfSE9TVBABEg8KC1JPTEVfQ0xJRU5UEAJCqwEKEWNvbS5waXJjLnYxYWxwaGExQgpSZWxheVByb3RvUAFaNXBpcmMuZGV2L3JlbGF5L2ludGVybmFsL3BiL3BpcmMvdjFhbHBoYTE7cGlyY3YxYWxwaGExogIDUFhYqgINUGlyYy5WMWFscGhhMcoCDVBpcmNcVjFhbHBoYTHiAhlQaXJjXFYxYWxwaGExXEdQQk1ldGFkYXRh6gIOUGlyYzo6VjFhbHBoYTFiBnByb3RvMw", [file_google_protobuf_duration, file_google_protobuf_timestamp, file_pirc_v1alpha1_common]);
var FrameSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_relay, 0);

// protocol/gen/pirc/v1alpha1/session_pb.ts
var file_pirc_v1alpha1_session = /* @__PURE__ */ fileDesc("ChtwaXJjL3YxYWxwaGExL3Nlc3Npb24ucHJvdG8SDXBpcmMudjFhbHBoYTEilQUKE1Nlc3Npb25Bbm5vdW5jZW1lbnQSDAoEbmFtZRgBIAEoCRILCgNjd2QYAiABKAkSEAoIaG9zdG5hbWUYAyABKAkSIwoFbW9kZWwYBCABKAsyFC5waXJjLnYxYWxwaGExLk1vZGVsEjQKDnRoaW5raW5nX2xldmVsGAUgASgOMhwucGlyYy52MWFscGhhMS5UaGlua2luZ0xldmVsEg8KB3dvcmtpbmcYBiABKAgSLgoKc3RhcnRlZF9hdBgHIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASGwoTcmVwbGFjZXNfc2Vzc2lvbl9pZBgIIAEoCRIsCgZvcmlnaW4YCSABKA4yHC5waXJjLnYxYWxwaGExLlNlc3Npb25PcmlnaW4SEgoKcGlfdmVyc2lvbhgKIAEoCRIZChFleHRlbnNpb25fdmVyc2lvbhgLIAEoCRISCgpjb21wYWN0aW5nGAwgASgIEiMKBXBsYWNlGA0gASgLMhQucGlyYy52MWFscGhhMS5QbGFjZRIUCgxmaXJzdF9wcm9tcHQYDiABKAkSEAoIcmVxdWVzdHMYDyADKAkSEAoIbGF1bmNoZXIYECABKAkSEQoJbGF1bmNoX2lkGBEgASgJEioKCXF1ZXN0aW9ucxgSIAMoCzIXLnBpcmMudjFhbHBoYTEuUXVlc3Rpb24SJQoGbm90aWNlGBMgASgLMhUucGlyYy52MWFscGhhMS5Ob3RpY2USEQoEY29zdBgUIAEoAUgAiAEBEhsKDmNvbnRleHRfdG9rZW5zGBUgASgESAGIAQESFgoOY29udGV4dF93aW5kb3cYFiABKARCBwoFX2Nvc3RCEQoPX2NvbnRleHRfdG9rZW5zIk8KBk5vdGljZRIOCgZudW1iZXIYASABKAQSJwoEa2luZBgCIAEoDjIZLnBpcmMudjFhbHBoYTEuTm90aWNlS2luZBIMCgR0ZXh0GAMgASgJIskBCghRdWVzdGlvbhIKCgJpZBgBIAEoCRIpCgRraW5kGAIgASgOMhsucGlyYy52MWFscGhhMS5RdWVzdGlvbktpbmQSDQoFdGl0bGUYAyABKAkSDwoHbWVzc2FnZRgEIAEoCRIPCgdvcHRpb25zGAUgAygJEhMKC3BsYWNlaG9sZGVyGAYgASgJEhIKCmFuc3dlcmFibGUYByABKAgSLAoIYXNrZWRfYXQYCCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wIq0BCgVQbGFjZRIMCgRraW5kGAEgASgJEg0KBWdyb3VwGAIgASgJEhkKDGdyb3VwX251bWJlchgDIAEoDUgAiAEBEg4KBndpbmRvdxgEIAEoCRIaCg13aW5kb3dfbnVtYmVyGAUgASgNSAGIAQESDAoEcGFuZRgGIAEoCRIPCgdkaXNwbGF5GAcgASgJQg8KDV9ncm91cF9udW1iZXJCEAoOX3dpbmRvd19udW1iZXIiMwoFTW9kZWwSEAoIcHJvdmlkZXIYASABKAkSCgoCaWQYAiABKAkSDAoEbmFtZRgDIAEoCSKECwoOU2Vzc2lvbk1lc3NhZ2USEgoKcmVxdWVzdF9pZBgyIAEoCRInCgZwcm9tcHQYASABKAsyFS5waXJjLnYxYWxwaGExLlByb21wdEgAEiUKBWFib3J0GAIgASgLMhQucGlyYy52MWFscGhhMS5BYm9ydEgAEjgKD2hpc3RvcnlfcmVxdWVzdBgDIAEoCzIdLnBpcmMudjFhbHBoYTEuSGlzdG9yeVJlcXVlc3RIABIwCgtsaXN0X21vZGVscxgEIAEoCzIZLnBpcmMudjFhbHBoYTEuTGlzdE1vZGVsc0gAEiwKCXNldF9tb2RlbBgFIAEoCzIXLnBpcmMudjFhbHBoYTEuU2V0TW9kZWxIABI9ChJzZXRfdGhpbmtpbmdfbGV2ZWwYBiABKAsyHy5waXJjLnYxYWxwaGExLlNldFRoaW5raW5nTGV2ZWxIABIpCgdjb21wYWN0GAcgASgLMhYucGlyYy52MWFscGhhMS5Db21wYWN0SAASMAoLbmV3X3Nlc3Npb24YCCABKAsyGS5waXJjLnYxYWxwaGExLk5ld1Nlc3Npb25IABInCgZyZW5hbWUYCSABKAsyFS5waXJjLnYxYWxwaGExLlJlbmFtZUgAEjQKDXN0YXRzX3JlcXVlc3QYESABKAsyGy5waXJjLnYxYWxwaGExLlN0YXRzUmVxdWVzdEgAEjQKDWxpc3RfY29tbWFuZHMYEiABKAsyGy5waXJjLnYxYWxwaGExLkxpc3RDb21tYW5kc0gAEiMKBGZvcmsYEyABKAsyEy5waXJjLnYxYWxwaGExLkZvcmtIABIlCgVjbG9uZRgUIAEoCzIULnBpcmMudjFhbHBoYTEuQ2xvbmVIABI9ChJsaXN0X3Bhc3Rfc2Vzc2lvbnMYFSABKAsyHy5waXJjLnYxYWxwaGExLkxpc3RQYXN0U2Vzc2lvbnNIABInCgZyZXN1bWUYFiABKAsyFS5waXJjLnYxYWxwaGExLlJlc3VtZUgAEicKBnJlbG9hZBgYIAEoCzIVLnBpcmMudjFhbHBoYTEuUmVsb2FkSAASNAoNbmF2aWdhdGVfdHJlZRgZIAEoCzIbLnBpcmMudjFhbHBoYTEuTmF2aWdhdGVUcmVlSAASLAoJbGlzdF90cmVlGBogASgLMhcucGlyYy52MWFscGhhMS5MaXN0VHJlZUgAEiMKBHN0b3AYHCABKAsyEy5waXJjLnYxYWxwaGExLlN0b3BIABInCgZsYXVuY2gYHSABKAsyFS5waXJjLnYxYWxwaGExLkxhdW5jaEgAEicKBmFuc3dlchgeIAEoCzIVLnBpcmMudjFhbHBoYTEuQW5zd2VySAASLAoFZXZlbnQYCiABKAsyGy5waXJjLnYxYWxwaGExLlNlc3Npb25FdmVudEgAEikKB2hpc3RvcnkYCyABKAsyFi5waXJjLnYxYWxwaGExLkhpc3RvcnlIABIrCghhY2NlcHRlZBgMIAEoCzIXLnBpcmMudjFhbHBoYTEuQWNjZXB0ZWRIABIlCgVlcnJvchgNIAEoCzIULnBpcmMudjFhbHBoYTEuRXJyb3JIABInCgZtb2RlbHMYDiABKAsyFS5waXJjLnYxYWxwaGExLk1vZGVsc0gAEiUKBXN0YXRzGA8gASgLMhQucGlyYy52MWFscGhhMS5TdGF0c0gAEisKCGNvbW1hbmRzGBAgASgLMhcucGlyYy52MWFscGhhMS5Db21tYW5kc0gAEjQKDXBhc3Rfc2Vzc2lvbnMYFyABKAsyGy5waXJjLnYxYWxwaGExLlBhc3RTZXNzaW9uc0gAEiMKBHRyZWUYGyABKAsyEy5waXJjLnYxYWxwaGExLlRyZWVIAEIGCgRib2R5IiAKCkxpc3RNb2RlbHMSEgoKcmVxdWVzdF9pZBgBIAEoCSJxCgZNb2RlbHMSEgoKcmVxdWVzdF9pZBgBIAEoCRIoCgZtb2RlbHMYAiADKAsyGC5waXJjLnYxYWxwaGExLk1vZGVsSW5mbxIpCgdjdXJyZW50GAMgASgLMhgucGlyYy52MWFscGhhMS5Nb2RlbEluZm8iawoJTW9kZWxJbmZvEiMKBW1vZGVsGAEgASgLMhQucGlyYy52MWFscGhhMS5Nb2RlbBIRCglyZWFzb25pbmcYAiABKAgSFgoOY29udGV4dF93aW5kb3cYAyABKAQSDgoGaW1hZ2VzGAQgASgIIkMKCFNldE1vZGVsEhIKCnJlcXVlc3RfaWQYASABKAkSIwoFbW9kZWwYAiABKAsyFC5waXJjLnYxYWxwaGExLk1vZGVsIlMKEFNldFRoaW5raW5nTGV2ZWwSEgoKcmVxdWVzdF9pZBgBIAEoCRIrCgVsZXZlbBgCIAEoDjIcLnBpcmMudjFhbHBoYTEuVGhpbmtpbmdMZXZlbCIzCgdDb21wYWN0EhIKCnJlcXVlc3RfaWQYASABKAkSFAoMaW5zdHJ1Y3Rpb25zGAIgASgJIiAKCk5ld1Nlc3Npb24SEgoKcmVxdWVzdF9pZBgBIAEoCSIsCgRGb3JrEhIKCnJlcXVlc3RfaWQYASABKAkSEAoIZW50cnlfaWQYAiABKAkiGwoFQ2xvbmUSEgoKcmVxdWVzdF9pZBgBIAEoCSI7ChBMaXN0UGFzdFNlc3Npb25zEhIKCnJlcXVlc3RfaWQYASABKAkSEwoLYWxsX2ZvbGRlcnMYAiABKAgiYwoMUGFzdFNlc3Npb25zEhIKCnJlcXVlc3RfaWQYASABKAkSLAoIc2Vzc2lvbnMYAiADKAsyGi5waXJjLnYxYWxwaGExLlBhc3RTZXNzaW9uEhEKCXRydW5jYXRlZBgDIAEoCCLYAQoLUGFzdFNlc3Npb24SDAoEcGF0aBgBIAEoCRISCgpzZXNzaW9uX2lkGAIgASgJEgsKA2N3ZBgDIAEoCRIMCgRuYW1lGAQgASgJEhQKDGZpcnN0X3Byb21wdBgFIAEoCRIuCgpjcmVhdGVkX2F0GAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIvCgttb2RpZmllZF9hdBgHIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASFQoNbWVzc2FnZV9jb3VudBgIIAEoDSIqCgZSZXN1bWUSEgoKcmVxdWVzdF9pZBgBIAEoCRIMCgRwYXRoGAIgASgJIhwKBlJlbG9hZBISCgpyZXF1ZXN0X2lkGAEgASgJIhoKBFN0b3ASEgoKcmVxdWVzdF9pZBgBIAEoCSI3CgZMYXVuY2gSEgoKcmVxdWVzdF9pZBgBIAEoCRILCgNjd2QYAiABKAkSDAoEbmFtZRgDIAEoCSKGAQoGQW5zd2VyEhIKCnJlcXVlc3RfaWQYASABKAkSEwoLcXVlc3Rpb25faWQYAiABKAkSEAoGb3B0aW9uGAMgASgNSAASEwoJY29uZmlybWVkGAQgASgISAASDgoEdGV4dBgFIAEoCUgAEhMKCWRpc21pc3NlZBgGIAEoCEgAQgcKBXZhbHVlIkcKDE5hdmlnYXRlVHJlZRISCgpyZXF1ZXN0X2lkGAEgASgJEhAKCGVudHJ5X2lkGAIgASgJEhEKCXN1bW1hcml6ZRgDIAEoCCIeCghMaXN0VHJlZRISCgpyZXF1ZXN0X2lkGAEgASgJIlYKBFRyZWUSEgoKcmVxdWVzdF9pZBgBIAEoCRInCghicmFuY2hlcxgCIAMoCzIVLnBpcmMudjFhbHBoYTEuQnJhbmNoEhEKCXRydW5jYXRlZBgDIAEoCCKQAQoGQnJhbmNoEg8KB2xlYWZfaWQYASABKAkSDwoHY3VycmVudBgCIAEoCBIOCgZwcm9tcHQYAyABKAkSDAoEbGFzdBgEIAEoCRIvCgttb2RpZmllZF9hdBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASFQoNbWVzc2FnZV9jb3VudBgGIAEoDSIqCgZSZW5hbWUSEgoKcmVxdWVzdF9pZBgBIAEoCRIMCgRuYW1lGAIgASgJIiIKDFN0YXRzUmVxdWVzdBISCgpyZXF1ZXN0X2lkGAEgASgJIogBCgVTdGF0cxISCgpyZXF1ZXN0X2lkGAEgASgJEiMKBXRvdGFsGAIgASgLMhQucGlyYy52MWFscGhhMS5Vc2FnZRIbCg5jb250ZXh0X3Rva2VucxgDIAEoBEgAiAEBEhYKDmNvbnRleHRfd2luZG93GAQgASgEQhEKD19jb250ZXh0X3Rva2VucyIiCgxMaXN0Q29tbWFuZHMSEgoKcmVxdWVzdF9pZBgBIAEoCSJMCghDb21tYW5kcxISCgpyZXF1ZXN0X2lkGAEgASgJEiwKCGNvbW1hbmRzGAIgAygLMhoucGlyYy52MWFscGhhMS5Db21tYW5kSW5mbyJeCgtDb21tYW5kSW5mbxIMCgRuYW1lGAEgASgJEhMKC2Rlc2NyaXB0aW9uGAIgASgJEiwKBnNvdXJjZRgDIAEoDjIcLnBpcmMudjFhbHBoYTEuQ29tbWFuZFNvdXJjZSJ7CgZQcm9tcHQSEgoKcmVxdWVzdF9pZBgBIAEoCRIMCgR0ZXh0GAIgASgJEiQKBmltYWdlcxgDIAMoCzIULnBpcmMudjFhbHBoYTEuSW1hZ2USKQoIZGVsaXZlcnkYBCABKA4yFy5waXJjLnYxYWxwaGExLkRlbGl2ZXJ5IigKBUltYWdlEhEKCW1pbWVfdHlwZRgBIAEoCRIMCgRkYXRhGAIgASgMIhsKBUFib3J0EhIKCnJlcXVlc3RfaWQYASABKAkiSwoOSGlzdG9yeVJlcXVlc3QSEgoKcmVxdWVzdF9pZBgBIAEoCRINCgVsaW1pdBgCIAEoDRIWCg5hZnRlcl9lbnRyeV9pZBgDIAEoCSKBAQoHSGlzdG9yeRISCgpyZXF1ZXN0X2lkGAEgASgJEi4KBWl0ZW1zGAIgAygLMh8ucGlyYy52MWFscGhhMS5Db252ZXJzYXRpb25JdGVtEgsKA3NlcRgDIAEoBBIRCgl0cnVuY2F0ZWQYBCABKAgSEgoKZnJvbV9lbnRyeRgFIAEoCCIeCghBY2NlcHRlZBISCgpyZXF1ZXN0X2lkGAEgASgJIpoDCgxTZXNzaW9uRXZlbnQSCwoDc2VxGAEgASgEEiYKAmF0GAIgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIvCgRpdGVtGAMgASgLMh8ucGlyYy52MWFscGhhMS5Db252ZXJzYXRpb25JdGVtSAASOAoPYXNzaXN0YW50X2RlbHRhGAQgASgLMh0ucGlyYy52MWFscGhhMS5Bc3Npc3RhbnREZWx0YUgAEjQKDXRvb2xfcHJvZ3Jlc3MYBSABKAsyGy5waXJjLnYxYWxwaGExLlRvb2xQcm9ncmVzc0gAEjgKD3dvcmtpbmdfY2hhbmdlZBgGIAEoCzIdLnBpcmMudjFhbHBoYTEuV29ya2luZ0NoYW5nZWRIABI6Cgxhbm5vdW5jZW1lbnQYByABKAsyIi5waXJjLnYxYWxwaGExLlNlc3Npb25Bbm5vdW5jZW1lbnRIABI2Cg5icmFuY2hfY2hhbmdlZBgIIAEoCzIcLnBpcmMudjFhbHBoYTEuQnJhbmNoQ2hhbmdlZEgAQgYKBGJvZHkioAMKEENvbnZlcnNhdGlvbkl0ZW0SEAoIZW50cnlfaWQYASABKAkSDwoHdHVybl9pZBgCIAEoCRImCgJhdBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASMgoMdXNlcl9tZXNzYWdlGAQgASgLMhoucGlyYy52MWFscGhhMS5Vc2VyTWVzc2FnZUgAEjwKEWFzc2lzdGFudF9tZXNzYWdlGAUgASgLMh8ucGlyYy52MWFscGhhMS5Bc3Npc3RhbnRNZXNzYWdlSAASLAoJdG9vbF9jYWxsGAYgASgLMhcucGlyYy52MWFscGhhMS5Ub29sQ2FsbEgAEjAKC3Rvb2xfcmVzdWx0GAcgASgLMhkucGlyYy52MWFscGhhMS5Ub29sUmVzdWx0SAASLwoKY29tcGFjdGlvbhgIIAEoCzIZLnBpcmMudjFhbHBoYTEuQ29tcGFjdGlvbkgAEjYKDmJyYW5jaF9zdW1tYXJ5GAkgASgLMhwucGlyYy52MWFscGhhMS5CcmFuY2hTdW1tYXJ5SABCBgoEYm9keSJVCgtVc2VyTWVzc2FnZRIMCgR0ZXh0GAEgASgJEiQKBmltYWdlcxgCIAMoCzIULnBpcmMudjFhbHBoYTEuSW1hZ2USEgoKcmVxdWVzdF9pZBgDIAEoCSLlAQoQQXNzaXN0YW50TWVzc2FnZRISCgptZXNzYWdlX2lkGAEgASgJEiwKB2NvbnRlbnQYAiADKAsyGy5waXJjLnYxYWxwaGExLkNvbnRlbnRCbG9jaxIjCgV1c2FnZRgDIAEoCzIULnBpcmMudjFhbHBoYTEuVXNhZ2USLgoLc3RvcF9yZWFzb24YBCABKA4yGS5waXJjLnYxYWxwaGExLlN0b3BSZWFzb24SIwoFbW9kZWwYBSABKAsyFC5waXJjLnYxYWxwaGExLk1vZGVsEhUKDWVycm9yX21lc3NhZ2UYBiABKAkiOgoMQ29udGVudEJsb2NrEg4KBHRleHQYASABKAlIABISCgh0aGlua2luZxgCIAEoCUgAQgYKBGJvZHkieQoFVXNhZ2USFAoMaW5wdXRfdG9rZW5zGAEgASgEEhUKDW91dHB1dF90b2tlbnMYAiABKAQSGQoRY2FjaGVfcmVhZF90b2tlbnMYAyABKAQSGgoSY2FjaGVfd3JpdGVfdG9rZW5zGAQgASgEEgwKBGNvc3QYBSABKAEidgoOQXNzaXN0YW50RGVsdGESEgoKbWVzc2FnZV9pZBgBIAEoCRIPCgd0dXJuX2lkGAIgASgJEhMKC2Jsb2NrX2luZGV4GAMgASgNEg4KBHRleHQYBCABKAlIABISCgh0aGlua2luZxgFIAEoCUgAQgYKBGJvZHkiSwoIVG9vbENhbGwSFAoMdG9vbF9jYWxsX2lkGAEgASgJEhEKCXRvb2xfbmFtZRgCIAEoCRIWCg5hcmd1bWVudHNfanNvbhgDIAEoCSKgAQoKVG9vbFJlc3VsdBIUCgx0b29sX2NhbGxfaWQYASABKAkSEAoIaXNfZXJyb3IYAiABKAgSDAoEdGV4dBgDIAEoCRIYCgtkdXJhdGlvbl9tcxgEIAEoDUgAiAEBEhYKCWV4aXRfY29kZRgFIAEoBUgBiAEBEgwKBGRpZmYYBiABKAlCDgoMX2R1cmF0aW9uX21zQgwKCl9leGl0X2NvZGUiQwoMVG9vbFByb2dyZXNzEhQKDHRvb2xfY2FsbF9pZBgBIAEoCRIPCgd0dXJuX2lkGAIgASgJEgwKBHRleHQYAyABKAkiIQoOV29ya2luZ0NoYW5nZWQSDwoHd29ya2luZxgBIAEoCCI0CgpDb21wYWN0aW9uEg8KB3N1bW1hcnkYASABKAkSFQoNdG9rZW5zX2JlZm9yZRgCIAEoBCIgCg1CcmFuY2hTdW1tYXJ5Eg8KB3N1bW1hcnkYASABKAkiIAoNQnJhbmNoQ2hhbmdlZBIPCgdsZWFmX2lkGAEgASgJKnUKCk5vdGljZUtpbmQSGwoXTk9USUNFX0tJTkRfVU5TUEVDSUZJRUQQABIYChROT1RJQ0VfS0lORF9GSU5JU0hFRBABEhYKEk5PVElDRV9LSU5EX0ZBSUxFRBACEhgKFE5PVElDRV9LSU5EX1FVRVNUSU9OEAMqrwEKDFF1ZXN0aW9uS2luZBIdChlRVUVTVElPTl9LSU5EX1VOU1BFQ0lGSUVEEAASGAoUUVVFU1RJT05fS0lORF9TRUxFQ1QQARIZChVRVUVTVElPTl9LSU5EX0NPTkZJUk0QAhIXChNRVUVTVElPTl9LSU5EX0lOUFVUEAMSGAoUUVVFU1RJT05fS0lORF9FRElUT1IQBBIYChRRVUVTVElPTl9LSU5EX0NVU1RPTRAFKrIBCg1TZXNzaW9uT3JpZ2luEh4KGlNFU1NJT05fT1JJR0lOX1VOU1BFQ0lGSUVEEAASGgoWU0VTU0lPTl9PUklHSU5fU1RBUlRVUBABEhYKElNFU1NJT05fT1JJR0lOX05FVxACEhkKFVNFU1NJT05fT1JJR0lOX1JFU1VNRRADEhcKE1NFU1NJT05fT1JJR0lOX0ZPUksQBBIZChVTRVNTSU9OX09SSUdJTl9SRUxPQUQQBSrhAQoNVGhpbmtpbmdMZXZlbBIeChpUSElOS0lOR19MRVZFTF9VTlNQRUNJRklFRBAAEhYKElRISU5LSU5HX0xFVkVMX09GRhABEhoKFlRISU5LSU5HX0xFVkVMX01JTklNQUwQAhIWChJUSElOS0lOR19MRVZFTF9MT1cQAxIZChVUSElOS0lOR19MRVZFTF9NRURJVU0QBBIXChNUSElOS0lOR19MRVZFTF9ISUdIEAUSGAoUVEhJTktJTkdfTEVWRUxfWEhJR0gQBhIWChJUSElOS0lOR19MRVZFTF9NQVgQByqCAQoNQ29tbWFuZFNvdXJjZRIeChpDT01NQU5EX1NPVVJDRV9VTlNQRUNJRklFRBAAEhwKGENPTU1BTkRfU09VUkNFX0VYVEVOU0lPThABEhkKFUNPTU1BTkRfU09VUkNFX1BST01QVBACEhgKFENPTU1BTkRfU09VUkNFX1NLSUxMEAMqUAoIRGVsaXZlcnkSGAoUREVMSVZFUllfVU5TUEVDSUZJRUQQABISCg5ERUxJVkVSWV9TVEVFUhABEhYKEkRFTElWRVJZX0ZPTExPV19VUBACKrsBCgpTdG9wUmVhc29uEhsKF1NUT1BfUkVBU09OX1VOU1BFQ0lGSUVEEAASFAoQU1RPUF9SRUFTT05fU1RPUBABEhYKElNUT1BfUkVBU09OX0xFTkdUSBACEhgKFFNUT1BfUkVBU09OX1RPT0xfVVNFEAMSFwoTU1RPUF9SRUFTT05fQUJPUlRFRBAEEhUKEVNUT1BfUkVBU09OX0VSUk9SEAUSGAoUU1RPUF9SRUFTT05fREVGRVJSRUQQBkKtAQoRY29tLnBpcmMudjFhbHBoYTFCDFNlc3Npb25Qcm90b1ABWjVwaXJjLmRldi9yZWxheS9pbnRlcm5hbC9wYi9waXJjL3YxYWxwaGExO3BpcmN2MWFscGhhMaICA1BYWKoCDVBpcmMuVjFhbHBoYTHKAg1QaXJjXFYxYWxwaGEx4gIZUGlyY1xWMWFscGhhMVxHUEJNZXRhZGF0YeoCDlBpcmM6OlYxYWxwaGExYgZwcm90bzM", [file_google_protobuf_timestamp, file_pirc_v1alpha1_common]);
var SessionAnnouncementSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 0);
var NoticeSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 1);
var QuestionSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 2);
var PlaceSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 3);
var ModelSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 4);
var SessionMessageSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 5);
var ModelInfoSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 8);
var BranchSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 26);
var ImageSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 34);
var HistorySchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 37);
var ConversationItemSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 40);
var ContentBlockSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 43);
var UsageSchema = /* @__PURE__ */ messageDesc(file_pirc_v1alpha1_session, 44);

// protocol/helpers.ts
function errorReply(requestId, code, message) {
  return create(SessionMessageSchema, { body: { case: "error", value: { requestId, code, message } } });
}
function accepted(requestId) {
  return create(SessionMessageSchema, { body: { case: "accepted", value: { requestId } } });
}
function requestIdOf(body) {
  return body?.value?.requestId ?? "";
}
function messageRequestId(m) {
  return requestIdOf(m.body) || m.requestId;
}
function requestName(bodyCase) {
  return bodyCase.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}
var hex = (b) => Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
function sameBytes(a, b) {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}
var THINKING_NAMES = ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
var LEVEL = {
  off: 1 /* OFF */,
  minimal: 2 /* MINIMAL */,
  low: 3 /* LOW */,
  medium: 4 /* MEDIUM */,
  high: 5 /* HIGH */,
  xhigh: 6 /* XHIGH */,
  max: 7 /* MAX */
};
function thinkingLevel(name) {
  return name !== void 0 && Object.hasOwn(LEVEL, name) ? LEVEL[name] : void 0;
}
function thinkingName(level) {
  return THINKING_NAMES.find((n) => LEVEL[n] === level);
}

// relay-client/keys.ts
import { createPrivateKey, createPublicKey, generateKeyPairSync, randomBytes, sign } from "node:crypto";
import { linkSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
function fromPem(pem) {
  const privateKey = createPrivateKey(pem);
  if (privateKey.asymmetricKeyType !== "ed25519") {
    throw new Error("not an Ed25519 key");
  }
  const jwk = createPublicKey(privateKey).export({ format: "jwk" });
  return { privateKey, publicKey: new Uint8Array(Buffer.from(jwk.x, "base64url")) };
}
function loadOrCreateKey(path) {
  try {
    return fromPem(readFileSync(path, "utf8"));
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
  mkdirSync(dirname(path), { recursive: true, mode: 448 });
  const { privateKey } = generateKeyPairSync("ed25519");
  const pem = privateKey.export({ format: "pem", type: "pkcs8" });
  const tmp = `${path}.${process.pid}.${randomBytes(4).toString("hex")}`;
  writeFileSync(tmp, pem, { flag: "wx", mode: 384 });
  try {
    linkSync(tmp, path);
  } catch (e) {
    if (e.code !== "EEXIST") throw e;
    return fromPem(readFileSync(path, "utf8"));
  } finally {
    unlinkSync(tmp);
  }
  return fromPem(pem);
}
function signWith(key2, data) {
  return new Uint8Array(sign(null, data, key2.privateKey));
}

// relay-client/connection.ts
var AUTH_CONTEXT = new TextEncoder().encode("pirc-auth-v1alpha1\0");
var PROTOCOL_PATH = "/v1alpha1";
function relayURL(url) {
  if (!URL.canParse(url)) throw new Error(`not a relay URL: ${url}`);
  const u = new URL(url);
  if (u.protocol === "http:" || u.protocol === "https:") {
    const ws = u.protocol === "http:" ? "ws" : "wss";
    throw new Error(`relay URL must start with ws:// or wss://: ${url} (did you mean ${ws}://${url.slice(u.protocol.length + 2)}?)`);
  }
  if (u.protocol !== "ws:" && u.protocol !== "wss:") {
    throw new Error(`relay URL must start with ws:// or wss://: ${url}`);
  }
  if (u.pathname === "" || u.pathname === "/") u.pathname = PROTOCOL_PATH;
  return u.toString();
}
var MAX_STRING_BYTES = 128;
function cutUtf8(s, max = MAX_STRING_BYTES) {
  const bytes = new TextEncoder().encode(s);
  if (bytes.length <= max) return s;
  let end = max;
  while (end > 0 && (bytes[end] & 192) === 128) end--;
  return new TextDecoder().decode(bytes.subarray(0, end));
}
var REFUSALS = /* @__PURE__ */ new Set([
  1 /* UNAUTHENTICATED */,
  2 /* PERMISSION_DENIED */,
  10 /* TOKEN_INVALID */,
  3 /* VERSION_UNSUPPORTED */,
  4 /* INVALID */
]);
var RelayConnection = class {
  constructor(opts) {
    this.opts = opts;
    this.url = relayURL(opts.url);
    this.token = opts.token;
  }
  opts;
  ws;
  state = { kind: "stopped" };
  stopped = true;
  attempt = 0;
  retryTimer;
  pingTimer;
  loginTimer;
  token;
  // A token refused because another process of this host redeemed it at
  // the same moment, with the same key, earns one retry. The retry keeps
  // the token: the relay lets a registered key in whatever token it brings,
  // and refuses a wrong one again, which is then the answer. Without it, a
  // host's key alone would be held for approval instead.
  tokenRetried = false;
  url;
  get current() {
    return this.state;
  }
  start() {
    if (!this.stopped) return;
    this.stopped = false;
    this.connect();
  }
  stop() {
    this.stopped = true;
    clearTimeout(this.retryTimer);
    this.teardown();
    this.setState({ kind: "stopped" });
  }
  // Sends a frame if logged in; false when it could not be sent.
  send(frame) {
    if (this.state.kind !== "ready" || this.ws?.readyState !== wrapper_default.OPEN) return false;
    const bytes = toBinary(FrameSchema, frame);
    if (bytes.length > this.state.maxFrameBytes) return false;
    if (this.ws.bufferedAmount > 16 * this.state.maxFrameBytes) {
      this.retry("relay is not reading");
      return false;
    }
    this.ws.send(bytes);
    return true;
  }
  // Runs one of the caller's callbacks, keeping its errors from us.
  call(where, fn, ...args) {
    try {
      fn?.(...args);
    } catch (e) {
      try {
        this.opts.onError?.(where, e);
      } catch {
      }
    }
  }
  setState(s) {
    this.state = s;
    this.call("onState", this.opts.onState, s);
  }
  teardown() {
    clearInterval(this.pingTimer);
    clearTimeout(this.loginTimer);
    const ws = this.ws;
    this.ws = void 0;
    if (ws) {
      ws.removeAllListeners();
      ws.on("error", () => {
      });
      ws.terminate();
    }
  }
  retry(reason, delayMs) {
    this.teardown();
    if (this.stopped) return;
    this.setState({ kind: "offline", reason });
    if (this.stopped) return;
    const min = this.opts.minBackoffMs ?? 1e3;
    const max = this.opts.maxBackoffMs ?? 3e4;
    const backoff = Math.min(max, min * 2 ** this.attempt++);
    const wait = delayMs ?? backoff / 2 + Math.random() * (backoff / 2);
    this.retryTimer = setTimeout(() => this.connect(), wait);
  }
  // Asks again in a while, without backing off: approval comes from a
  // person, who expects it to work soon after.
  await(reason) {
    this.teardown();
    if (this.stopped) return;
    this.attempt = 0;
    this.setState({ kind: "pending", reason });
    this.retryTimer = setTimeout(() => this.connect(), this.opts.approvalRetryMs ?? 1e4);
  }
  refuse(code, reason, removed) {
    this.teardown();
    this.stopped = true;
    this.setState({ kind: "refused", code, reason, ...removed && { removed } });
  }
  connect() {
    if (this.stopped) return;
    if (this.state.kind !== "pending") this.setState({ kind: "connecting" });
    const ws = new wrapper_default(this.url, { handshakeTimeout: 1e4, perMessageDeflate: false });
    ws.binaryType = "nodebuffer";
    this.ws = ws;
    let phase = "hello";
    let alive = true;
    this.loginTimer = setTimeout(() => {
      if (this.ws === ws && phase !== "ready") this.retry("relay did not finish the login in time");
    }, this.opts.loginTimeoutMs ?? 15e3);
    ws.on("open", () => {
      const role = this.opts.role === "host" ? 1 /* HOST */ : 2 /* CLIENT */;
      this.write(ws, create(FrameSchema, {
        body: {
          case: "hello",
          value: {
            protocolVersion: 1 /* V1ALPHA1 */,
            role,
            publicKey: this.opts.key.publicKey,
            registrationToken: this.token ?? "",
            label: cutUtf8(this.opts.label ?? ""),
            software: cutUtf8(this.opts.software)
          }
        }
      }));
    });
    ws.on("pong", () => alive = true);
    ws.on("message", (data, isBinary) => {
      if (!isBinary) return this.retry("relay sent a text frame");
      let frame;
      try {
        frame = fromBinary(FrameSchema, new Uint8Array(data));
      } catch {
        return this.retry("relay sent an undecodable frame");
      }
      const body = frame.body;
      if (phase !== "ready") {
        if (body.case === "error") {
          const { code, message } = body.value;
          if (code === 10 /* TOKEN_INVALID */ && this.token && !this.tokenRetried && this.opts.tokenRetry !== false) {
            this.tokenRetried = true;
            return this.retry("registration token refused; trying once more, in case this host's other process used it", 1e3);
          }
          if (code === 14 /* APPROVAL_PENDING */) return this.await(message);
          if (REFUSALS.has(code)) return this.refuse(code, message);
          return this.retry(message || "login failed");
        }
        if (phase === "hello" && body.case === "challenge") {
          phase = "auth";
          const signed = new Uint8Array(AUTH_CONTEXT.length + body.value.nonce.length);
          signed.set(AUTH_CONTEXT);
          signed.set(body.value.nonce, AUTH_CONTEXT.length);
          this.write(ws, create(FrameSchema, { body: { case: "auth", value: { signature: signWith(this.opts.key, signed) } } }));
          return;
        }
        if (phase === "auth" && body.case === "welcome") {
          phase = "ready";
          clearTimeout(this.loginTimer);
          this.attempt = 0;
          if (this.token) {
            this.token = void 0;
            this.call("onRegistered", this.opts.onRegistered);
          }
          const every = this.opts.pingIntervalMs ?? 25e3;
          this.pingTimer = setInterval(() => {
            if (!alive) return this.retry("relay stopped answering");
            alive = false;
            ws.ping();
          }, every);
          this.setState({ kind: "ready", maxFrameBytes: body.value.maxFrameBytes });
          return;
        }
        return this.retry(`unexpected ${body.case ?? "empty frame"} during login`);
      }
      this.call("onFrame", this.opts.onFrame, frame);
    });
    ws.on("close", (code, reason) => {
      if (this.ws !== ws) return;
      if (phase === "ready" && code === 1008 && reason.toString() === "key revoked") {
        return this.refuse(1 /* UNAUTHENTICATED */, "this key was removed from the relay", true);
      }
      this.retry(`connection closed (${code}${reason.length ? ` ${reason}` : ""})`);
    });
    ws.on("error", (err) => {
      if (this.ws !== ws) return;
      this.retry(err.message);
    });
  }
  write(ws, frame) {
    if (ws.readyState === wrapper_default.OPEN) ws.send(toBinary(FrameSchema, frame));
  }
};

// extension/src/config.ts
import { mkdirSync as mkdirSync2, readFileSync as readFileSync2, renameSync, writeFileSync as writeFileSync2 } from "node:fs";
import { homedir, hostname } from "node:os";
import { dirname as dirname2, join } from "node:path";
function configDir() {
  return join(process.env.XDG_CONFIG_HOME || join(homedir(), ".config"), "pirc");
}
function configPath() {
  return process.env.PIRC_CONFIG || join(configDir(), "host.json");
}
function readFile(path) {
  try {
    return JSON.parse(readFileSync2(path, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") return {};
    throw new Error(`${path}: ${e.message}`);
  }
}
function loadConfig() {
  const path = configPath();
  const f = readFile(path);
  return {
    relay: process.env.PIRC_RELAY || f.relay,
    keyFile: f.keyFile || join(dirname2(path), "host.key"),
    label: f.label || hostname(),
    token: process.env.PIRC_TOKEN || void 0,
    removed: f.removed,
    path
  };
}
function saveRelay(relay) {
  const { removed: _, ...f } = readFile(configPath());
  write({ ...f, relay });
}
function saveRemoved(at) {
  write({ ...readFile(configPath()), removed: at.toISOString() });
}
function write(f) {
  const path = configPath();
  mkdirSync2(dirname2(path), { recursive: true, mode: 448 });
  const tmp = `${path}.${process.pid}.tmp`;
  writeFileSync2(tmp, JSON.stringify(f, null, 2) + "\n", { mode: 384 });
  renameSync(tmp, path);
}

// extension/src/host.ts
import { appendFileSync } from "node:fs";

// extension/src/live.ts
import { randomBytes as randomBytes2 } from "node:crypto";
import { existsSync as existsSync2 } from "node:fs";
import { hostname as hostname2 } from "node:os";

// extension/src/convert.ts
var MAX_TEXT = 256 * 1024;
function clip(s, max = MAX_TEXT) {
  return s.length <= max ? s : s.slice(0, max) + `
[\u2026 ${s.length - max} more characters not sent]`;
}
function modelRef(m) {
  return create(ModelSchema, { provider: m.provider, id: m.id, name: m.name ?? "" });
}
function modelInfo(m) {
  return create(ModelInfoSchema, {
    model: modelRef(m),
    reasoning: m.reasoning === true,
    contextWindow: count(m.contextWindow),
    images: m.input?.includes("image") === true
  });
}
function sessionTotals(entries) {
  const t = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, cost: 0 };
  const add = (u) => {
    if (!u) return;
    t.input += u.input ?? 0;
    t.output += u.output ?? 0;
    t.cacheRead += u.cacheRead ?? 0;
    t.cacheWrite += u.cacheWrite ?? 0;
    t.cost += u.cost?.total ?? 0;
  };
  for (const e of entries) {
    if (e.type === "usage" || e.type === "compaction" || e.type === "branch_summary") add(e.usage);
    else if (e.type === "message" && (e.message?.role === "assistant" || e.message?.role === "toolResult")) add(e.message.usage);
  }
  return create(UsageSchema, {
    inputTokens: count(t.input),
    outputTokens: count(t.output),
    cacheReadTokens: count(t.cacheRead),
    cacheWriteTokens: count(t.cacheWrite),
    cost: t.cost
  });
}
var STOP = {
  stop: 1 /* STOP */,
  length: 2 /* LENGTH */,
  toolUse: 3 /* TOOL_USE */,
  aborted: 4 /* ABORTED */,
  error: 5 /* ERROR */,
  deferred: 6 /* DEFERRED */
};
function count(n) {
  return Number.isFinite(n) && n > 0 ? BigInt(Math.round(n)) : 0n;
}
function stopReason(r) {
  return r && STOP[r] || 0 /* UNSPECIFIED */;
}
function textOf(content) {
  if (content === void 0) return "";
  if (typeof content === "string") return content;
  return content.filter((c) => c.type === "text").map((c) => c.text ?? "").join("");
}
function imagesOf(content) {
  if (content === void 0 || typeof content === "string") return [];
  return content.filter((c) => c.type === "image" && c.data).map((c) => create(ImageSchema, { mimeType: c.mimeType ?? "", data: new Uint8Array(Buffer.from(c.data, "base64")) }));
}
function messageItems(m, c, extra = {}) {
  const base = { entryId: c.entryId, turnId: c.turnId, at: c.at };
  switch (m.role) {
    case "user":
      return [create(ConversationItemSchema, {
        ...base,
        body: { case: "userMessage", value: { text: clip(textOf(m.content)), images: imagesOf(m.content), requestId: extra.requestId ?? "" } }
      })];
    case "assistant": {
      const content = [];
      const calls = [];
      for (const b of m.content) {
        if (b.type === "text") {
          content.push(create(ContentBlockSchema, { body: { case: "text", value: clip(b.text) } }));
        } else if (b.type === "thinking") {
          if (b.thinking) content.push(create(ContentBlockSchema, { body: { case: "thinking", value: clip(b.thinking) } }));
        } else if (b.type === "toolCall") {
          calls.push(create(ConversationItemSchema, {
            ...base,
            body: { case: "toolCall", value: { toolCallId: b.id, toolName: b.name, argumentsJson: clip(JSON.stringify(b.arguments ?? {})) } }
          }));
        }
      }
      const u = m.usage;
      const item = create(ConversationItemSchema, {
        ...base,
        body: {
          case: "assistantMessage",
          value: {
            messageId: extra.messageId ?? c.entryId,
            content,
            usage: u && {
              inputTokens: count(u.input),
              outputTokens: count(u.output),
              cacheReadTokens: count(u.cacheRead),
              cacheWriteTokens: count(u.cacheWrite),
              cost: u.cost?.total ?? 0
            },
            stopReason: stopReason(m.stopReason),
            model: { provider: m.provider, id: m.model },
            errorMessage: m.stopReason === "error" ? clip(m.errorMessage ?? "", 4096) : ""
          }
        }
      });
      return [item, ...calls];
    }
    case "toolResult": {
      const text = textOf(m.content);
      return [create(ConversationItemSchema, {
        ...base,
        body: { case: "toolResult", value: { toolCallId: m.toolCallId, isError: m.isError, text: clip(text), ...resultFacts(m, text) } }
      })];
    }
    default:
      return [];
  }
}
function resultFacts(m, text) {
  const out = {};
  if (typeof m.durationMs === "number" && Number.isFinite(m.durationMs) && m.durationMs >= 0) out.durationMs = Math.min(Math.round(m.durationMs), 4294967295);
  if (m.toolName === "bash") {
    const code = /Command exited with code (\d+)\s*$/.exec(text);
    if (code) out.exitCode = Number(code[1]);
    else if (!m.isError) out.exitCode = 0;
  }
  const patch = m.details?.patch;
  if (m.toolName === "edit" && typeof patch === "string" && patch) out.diff = clip(patch);
  return out;
}
function atMs(ms) {
  return timestampFromMs(ms ?? Date.now());
}
function atIso(iso) {
  return timestampFromDate(new Date(iso));
}
function historyItems(branch2) {
  const items = [];
  let turnId = "";
  for (const e of branch2) {
    if (e.type === "message") {
      if (e.message.role === "user") turnId = e.id;
      items.push(...messageItems(e.message, { entryId: e.id, turnId, at: atIso(e.timestamp) }));
    } else if (e.type === "compaction") {
      items.push(compactionItem(e, turnId));
    } else if (e.type === "branch_summary") {
      items.push(create(ConversationItemSchema, {
        entryId: e.id,
        turnId,
        at: atIso(e.timestamp),
        body: { case: "branchSummary", value: { summary: clip(e.summary) } }
      }));
    }
  }
  return items;
}
function branches(sm) {
  const current = sm.getLeafId() ?? "";
  const here = current ? sm.getBranch(current) : [];
  const onCurrent = new Set(here.map((e) => e.id));
  const leaves = [];
  const stack = [...sm.getTree()];
  while (stack.length > 0) {
    const n = stack.pop();
    if (n.children.length === 0) leaves.push(n.entry);
    else stack.push(...n.children);
  }
  const others = [];
  for (const leaf of leaves) {
    if (onCurrent.has(leaf.id)) continue;
    const path = sm.getBranch(leaf.id);
    let split = path.length;
    while (split > 0 && !onCurrent.has(path[split - 1].id)) split--;
    const b = branch(leaf.id, false, path.slice(split), path);
    if (b.messageCount > 0) others.push(b);
  }
  others.sort((a, b) => Number(timestampMs(b.modifiedAt) - timestampMs(a.modifiedAt)));
  return [branch(current, true, here, here), ...others];
}
function branch(leafId, current, own, path) {
  const messages = own.flatMap((e) => e.type === "message" && (e.message.role === "user" || e.message.role === "assistant") ? [e.message] : []);
  const said = (m) => {
    const text = textOf(m.content);
    return firstLine(m.role === "user" ? promptText(text) : text);
  };
  const prompts = messages.filter((m) => m.role === "user");
  const prompt = current ? prompts[prompts.length - 1] : prompts[0];
  const last = [...messages].reverse().find((m) => said(m));
  const end = path[path.length - 1];
  return create(BranchSchema, {
    leafId,
    current,
    prompt: prompt ? said(prompt) : "",
    last: last ? said(last) : "",
    modifiedAt: end ? atIso(end.timestamp) : timestampFromMs(0),
    messageCount: messages.length
  });
}
function compactionItem(e, turnId) {
  return create(ConversationItemSchema, {
    entryId: e.id,
    turnId,
    at: atIso(e.timestamp),
    body: { case: "compaction", value: { summary: clip(e.summary), tokensBefore: count(e.tokensBefore) } }
  });
}
function lastTurnId(branch2) {
  for (let i = branch2.length - 1; i >= 0; i--) {
    const e = branch2[i];
    if (e.type === "message" && e.message.role === "user") return e.id;
  }
  return "";
}
function firstPrompt(branch2) {
  for (const e of branch2) {
    if (e.type !== "message" || e.message.role !== "user") continue;
    const line = firstLine(promptText(textOf(e.message.content)));
    if (line) return line;
  }
  return "";
}
var SKILL = /^<skill name="([^"]+)" location="[^"]+">\n[\s\S]*?\n<\/skill>(?:\n\n([\s\S]+))?$/;
function promptText(text) {
  const m = SKILL.exec(text);
  return m ? m[2]?.trim() || `/skill:${m[1]}` : text;
}
var FIRST_CHARS = 120;
function firstLine(text) {
  const line = (text.split("\n").find((l) => l.trim()) ?? "").trim();
  return line.length > FIRST_CHARS ? `${line.slice(0, FIRST_CHARS - 1)}\u2026` : line;
}
function fitItem(item, budget) {
  let size = toBinary(ConversationItemSchema, item).length;
  if (size <= budget) return item;
  const b = item.body;
  if (b.case === "userMessage" && b.value.images.some((i) => i.data.length > 0)) {
    for (const i of b.value.images) i.data = new Uint8Array();
    size = toBinary(ConversationItemSchema, item).length;
  }
  for (let round = 0; size > budget && round < 8; round++) {
    const cut2 = (t) => clip(t, Math.max(64, Math.floor(t.length * budget / size / 2)));
    switch (b.case) {
      case "userMessage":
        b.value.text = cut2(b.value.text);
        break;
      case "assistantMessage":
        for (const c of b.value.content) if (typeof c.body.value === "string") c.body.value = cut2(c.body.value);
        break;
      case "toolCall":
        b.value.argumentsJson = cut2(b.value.argumentsJson);
        break;
      case "toolResult":
        b.value.text = cut2(b.value.text);
        b.value.diff = cut2(b.value.diff);
        break;
      case "compaction":
      case "branchSummary":
        b.value.summary = cut2(b.value.summary);
        break;
    }
    size = toBinary(ConversationItemSchema, item).length;
  }
  return item;
}

// extension/src/notice.ts
var NOTICE_CHARS = 120;
var PLAIN_CHARS = 2e3;
function plainText(md) {
  let head = md.slice(0, PLAIN_CHARS);
  if (/[\ud800-\udbff]$/.test(head)) head = head.slice(0, -1);
  const lines = [];
  let fence;
  for (const line of head.split("\n")) {
    const f = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence !== void 0) {
      if (f && f[0] === fence[0] && f.length >= fence.length && !line.trim().slice(f.length)) fence = void 0;
      else lines.push(line);
      continue;
    }
    if (f) {
      fence = f;
      continue;
    }
    if (/^\s*([-*_]\s*){3,}$/.test(line) || /^\s*=+\s*$/.test(line)) continue;
    if (/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line)) continue;
    let l = line.replace(/^(\s*>)+\s?/, "");
    const heading = /^\s{0,3}#{1,6}\s+(.*?)(\s+#+)?\s*$/.exec(l);
    if (heading) {
      const h = inline(heading[1]).trim();
      lines.push(h && !/[.:!?…]$/.test(h) ? `${h}:` : h);
      continue;
    }
    l = l.replace(/^\s*([-*+]|\d+[.)])\s+(\[[ xX]\]\s+)?/, "");
    if (/^\s*\|.*\|\s*$/.test(l)) {
      l = l.trim().slice(1, -1).split(/(?<!\\)\|/).map((c) => c.trim()).join(" \xB7 ");
    }
    lines.push(inline(l));
  }
  return lines.join("\n");
}
function inline(s) {
  const spans = [];
  return s.replace(/\\([\\`*_{}\[\]()#+\-.!|~>])/g, (_, c) => String.fromCharCode(57344 + c.charCodeAt(0))).replace(/(`+)([^`]|[^`].*?[^`])\1(?!`)/g, (_, _ticks, code) => {
    spans.push(code.trim() ? code.trim() : code);
    return String.fromCharCode(57600 + spans.length - 1);
  }).replace(/!\[([^\]]*)\]\((?:[^()\s]|\([^()\s]*\))*(?:\s+"[^"]*")?\)/g, "$1").replace(/\[([^\]]+)\]\((?:[^()\s]|\([^()\s]*\))*(?:\s+"[^"]*")?\)/g, "$1").replace(/<((https?|mailto):[^>\s]+)>/g, "$1").replace(/(^|[^\w/])(\*\*|__)(?=\S)(.+?)(?<=\S)\2(?![\w/])/g, "$1$3").replace(/~~(?=\S)(.+?)(?<=\S)~~/g, "$1").replace(/(^|[^\w*/])\*(?=[^\s*])(.+?)(?<=[^\s*])\*(?![\w*/])/g, "$1$2").replace(/(^|[^\w])_(?=[^\s_])(.+?)(?<=[^\s_])_(?!\w)/g, "$1$2").replace(/[-]/g, (c) => spans[c.charCodeAt(0) - 57600] ?? c).replace(/[-]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 57344));
}
function noticeText(s) {
  const points = [...s.replace(/\s+/g, " ").trim()];
  if (points.length <= NOTICE_CHARS) return points.join("");
  return `${points.slice(0, NOTICE_CHARS - 1).join("").trimEnd()}\u2026`;
}
function nextNumber(last, now = Date.now()) {
  const n = BigInt(now);
  return last !== void 0 && n <= last ? last + 1n : n;
}
function turnNotice(reply, number) {
  const r = reply?.role === "assistant" ? reply : void 0;
  if (r?.stopReason === "aborted") return void 0;
  if (r?.stopReason === "error") return create(NoticeSchema, { number, kind: 2 /* FAILED */, text: noticeText(r.errorMessage ?? "") });
  const text = (r?.content ?? []).flatMap((c) => c.type === "text" ? [c.text] : []).join("\n");
  return create(NoticeSchema, { number, kind: 1 /* FINISHED */, text: noticeText(plainText(text)) });
}
function questionNotice(q, number) {
  return create(NoticeSchema, { number, kind: 3 /* QUESTION */, text: noticeText(plainText([q.title, q.message].join("\n"))) });
}

// extension/src/photos.ts
import { readFileSync as readFileSync4 } from "node:fs";
import { dirname as dirname4, join as join3 } from "node:path";
import { pathToFileURL } from "node:url";

// extension/src/pi.ts
import { readFileSync as readFileSync3, realpathSync } from "node:fs";
import { dirname as dirname3, join as join2 } from "node:path";
function piPackageDir() {
  try {
    let dir = dirname3(realpathSync(process.argv[1]));
    for (let i = 0; i < 5; i++, dir = dirname3(dir)) {
      try {
        const pkg = JSON.parse(readFileSync3(join2(dir, "package.json"), "utf8"));
        if (pkg.name === "@earendil-works/pi-coding-agent") return dir;
      } catch {
      }
    }
  } catch {
  }
  return void 0;
}
function piVersion() {
  const dir = piPackageDir();
  if (!dir) return "unknown";
  try {
    return String(JSON.parse(readFileSync3(join2(dir, "package.json"), "utf8")).version);
  } catch {
    return "unknown";
  }
}

// extension/src/photos.ts
var PHOTO_ENTRY = "pirc:photos";
var isTui = (m) => typeof m?.Image === "function" && typeof m.getCapabilities === "function" && typeof m.imageFallback === "function" && typeof m.getImageDimensions === "function";
var tui;
var convertToPng;
var loading;
function tuiEntry(pi) {
  const dirs = [join3(dirname4(pi), "tui")];
  for (let d = pi; ; d = dirname4(d)) {
    dirs.push(join3(d, "node_modules", "@earendil-works", "pi-tui"));
    if (dirname4(d) === d) break;
  }
  for (const dir of dirs) {
    try {
      const pkg = JSON.parse(readFileSync4(join3(dir, "package.json"), "utf8"));
      return join3(dir, pkg.exports?.["."]?.import ?? pkg.main ?? "dist/index.js");
    } catch {
    }
  }
  return void 0;
}
async function byName(name) {
  try {
    return await import(name);
  } catch {
    return void 0;
  }
}
async function byPath(path) {
  try {
    return { module: await import(pathToFileURL(path).href) };
  } catch (e) {
    return { error: e?.message ?? String(e) };
  }
}
function loadPhotos(given = {}, pi = piPackageDir()) {
  loading ??= (async () => {
    const from = [];
    let problem;
    const named = isTui(given.tui) ? void 0 : await byName("@earendil-works/pi-tui");
    if (isTui(given.tui)) {
      tui = given.tui;
      from.push("pi-tui from pi's loader");
    } else if (isTui(named)) {
      tui = named;
      from.push("pi-tui by name");
    } else {
      const entry = pi && tuiEntry(pi);
      const got = entry ? await byPath(entry) : { error: pi ? `not found beside pi in ${pi}` : "pi's install was not found from its command line" };
      if (isTui(got.module)) {
        tui = got.module;
        from.push(`pi-tui from ${entry}`);
      } else {
        problem = `pi-tui did not load (${got.error ?? `${entry} lacks Image`}), so no photo is drawn`;
      }
    }
    if (typeof given.convertToPng === "function") {
      convertToPng = given.convertToPng;
      from.push("conversion from pi's loader");
    } else {
      const named2 = await byName("@earendil-works/pi-coding-agent");
      const got = typeof named2?.convertToPng === "function" || !pi ? { module: named2 } : await byPath(join3(pi, "dist", "utils", "image-convert.js"));
      const fn = got.module?.convertToPng;
      if (typeof fn === "function") {
        convertToPng = fn;
        from.push(named2 === got.module ? "conversion by name" : "conversion from pi's install");
      } else if (!problem) {
        problem = `pi's conversion to PNG did not load (${got.error ?? "no convertToPng"}), so in terminals that speak kitty's protocol a photo shows as a line of text`;
      }
    }
    return { problem, from: from.join(", ") || "nothing" };
  })();
  return loading;
}
function photosOf(message) {
  const content = message?.role === "user" ? message.content : void 0;
  if (!Array.isArray(content)) return [];
  return content.filter((c) => c?.type === "image" && typeof c.data === "string" && c.data !== "" && typeof c.mimeType === "string");
}
var pngs = /* @__PURE__ */ new WeakMap();
var converting = /* @__PURE__ */ new WeakSet();
var converted = () => {
};
function onConverted(fn) {
  converted = fn;
}
var needsPng = (p) => tui?.getCapabilities().images === "kitty" && p.mimeType !== "image/png";
function preparePhotos(photos) {
  for (const p of photos) {
    if (!convertToPng || !needsPng(p) || pngs.has(p) || converting.has(p)) continue;
    converting.add(p);
    convertToPng(p.data, p.mimeType).then(
      (png) => pngs.set(p, png),
      () => pngs.set(p, null)
    ).finally(() => {
      converting.delete(p);
      converted();
    });
  }
}
var Photos = class {
  constructor(messageId, find, shown2) {
    this.messageId = messageId;
    this.find = find;
    this.shown = shown2;
  }
  messageId;
  find;
  shown;
  photos;
  drawn = /* @__PURE__ */ new Map();
  show(shown2) {
    if (shown2.width !== this.shown.width) this.drawn.clear();
    this.shown = shown2;
    this.invalidate();
  }
  render(width) {
    if (!this.photos) {
      const m = this.find(this.messageId);
      if (m === void 0) return [];
      this.photos = photosOf(m);
    }
    const lines = [];
    for (const p of this.photos) {
      const c = this.component(p);
      if (!c) continue;
      if (lines.length > 0) lines.push("");
      lines.push(...c.render(width));
    }
    return lines;
  }
  invalidate() {
    for (const c of this.drawn.values()) c.invalidate();
  }
  component(p) {
    const t = tui;
    const line = () => ({
      render: (width) => {
        const s = this.shown.color(t.imageFallback(p.mimeType, t.getImageDimensions(p.data, p.mimeType) ?? void 0));
        return [t.truncateToWidth ? t.truncateToWidth(s, width) : s];
      },
      invalidate() {
      }
    });
    if (!this.shown.show) return line();
    let image = p;
    if (needsPng(p)) {
      if (!convertToPng) return line();
      const png = pngs.get(p);
      if (png === void 0) {
        preparePhotos([p]);
        return void 0;
      }
      if (png === null) return line();
      image = png;
    }
    let c = this.drawn.get(p);
    if (!c) {
      c = new t.Image(image.data, image.mimeType, { fallbackColor: this.shown.color }, { maxWidthCells: this.shown.width });
      this.drawn.set(p, c);
    }
    return c;
  }
};
function shown(settings, color) {
  const width = settings?.terminal?.imageWidthCells;
  return {
    show: settings?.terminal?.showImages ?? true,
    width: typeof width === "number" && Number.isFinite(width) ? Math.max(1, Math.floor(width)) : 60,
    color
  };
}
function photoRenderer(find, settings) {
  const made = /* @__PURE__ */ new WeakMap();
  return (entry, _options, theme) => {
    if (!tui || typeof entry.data?.message !== "string") return void 0;
    const now = shown(settings(), (s) => theme.fg("dim", s));
    let c = made.get(entry);
    if (c) {
      c.show(now);
      return c;
    }
    c = new Photos(entry.data.message, find, now);
    made.set(entry, c);
    return c;
  };
}

// extension/src/launch.ts
import { existsSync, statSync } from "node:fs";
import { homedir as homedir2 } from "node:os";
import { join as join4 } from "node:path";

// extension/src/place.ts
import { execFile } from "node:child_process";
import { createConnection } from "node:net";
var DETECT_MS = 2e3;
var MAX_NAME = 128;
var PLACE_EVENT = "pirc:place";
function cut(s) {
  return typeof s === "string" ? cutUtf8(s.trim(), MAX_NAME) : "";
}
function num(n) {
  return typeof n === "number" && Number.isInteger(n) && n >= 0 && n < 2 ** 32 ? n : void 0;
}
function place(p) {
  const v = {
    kind: cut(p.kind),
    group: cut(p.group),
    window: cut(p.window),
    pane: cut(p.pane),
    display: cut(p.display),
    groupNumber: num(p.groupNumber),
    windowNumber: num(p.windowNumber)
  };
  if (!v.group && !v.window && !v.pane && !v.display) return void 0;
  return create(PlaceSchema, v);
}
function parseGiven(data) {
  if (data === null) return null;
  if (typeof data !== "object" || Array.isArray(data)) throw new Error("pirc:place takes an object, or null");
  return place(data);
}
function run(cmd, args, env) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { env, timeout: DETECT_MS, encoding: "utf8" }, (err, out) => err ? reject(err) : resolve(out));
  });
}
async function tmuxPlace(env) {
  const pane = env.TMUX_PANE;
  if (!env.TMUX || !pane) return void 0;
  const out = await run("tmux", ["display-message", "-p", "-t", pane, "#{session_name}	#{window_index}	#{window_name}"], env);
  const [group, windowNumber, window] = out.replace(/\n$/, "").split("	");
  return place({ kind: "tmux", group, window, windowNumber: Number(windowNumber) });
}
function herdrSession(path) {
  const socket = createConnection(path);
  let buf = "";
  let n = 0;
  const waiting = /* @__PURE__ */ new Map();
  const failAll = (e) => {
    for (const w of waiting.values()) w.reject(e);
    waiting.clear();
  };
  socket.setEncoding("utf8");
  socket.on("data", (d) => {
    buf += d;
    let i;
    while ((i = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, i);
      buf = buf.slice(i + 1);
      let m;
      try {
        m = JSON.parse(line);
      } catch {
        continue;
      }
      const w = m.id ? waiting.get(m.id) : void 0;
      if (!w) continue;
      waiting.delete(m.id);
      if (m.result) w.resolve(m.result);
      else w.reject(new Error(`herdr: ${m.error?.message ?? "no result"}`));
    }
  });
  socket.on("error", (e) => failAll(e));
  socket.on("close", () => failAll(new Error("herdr closed the connection")));
  return {
    ask(method, params) {
      const id = `pirc-${++n}`;
      return new Promise((resolve, reject) => {
        waiting.set(id, { resolve, reject });
        socket.write(`${JSON.stringify({ id, method, params })}
`);
      });
    },
    close() {
      socket.destroy();
    }
  };
}
function herdrPane(env) {
  const path = env.HERDR_SOCKET_PATH;
  const paneId = env.HERDR_PANE_ID;
  if (env.HERDR_ENV !== "1" || !path || !paneId) return void 0;
  return { socket: process.platform === "win32" ? `\\\\.\\pipe\\${path}` : path, paneId };
}
async function herdrPlace(env) {
  const at = herdrPane(env);
  if (!at) return void 0;
  const paneId = at.paneId;
  const h = herdrSession(at.socket);
  const timer = setTimeout(() => h.close(), DETECT_MS);
  try {
    const { pane } = await h.ask("pane.current", { caller_pane_id: paneId });
    if (!pane?.workspace_id || !pane.tab_id) return void 0;
    const [{ workspace }, { tab }] = await Promise.all([
      h.ask("workspace.get", { workspace_id: pane.workspace_id }),
      h.ask("tab.get", { tab_id: pane.tab_id })
    ]);
    return place({
      kind: "herdr",
      group: workspace?.label,
      groupNumber: workspace?.number,
      window: tab?.label,
      windowNumber: tab?.number,
      pane: pane.label
    });
  } finally {
    clearTimeout(timer);
    h.close();
  }
}
async function detectPlace(env = process.env) {
  return await herdrPlace(env) ?? await tmuxPlace(env);
}
var PlaceTracker = class {
  constructor(onChange, onError, detect = () => detectPlace()) {
    this.onChange = onChange;
    this.onError = onError;
    this.detect = detect;
  }
  onChange;
  onError;
  detect;
  detected;
  // Given by another extension: replaces detection until null hands back.
  given;
  checking;
  again = false;
  get current() {
    return this.given ? this.given.place : this.detected;
  }
  // From the pirc:place event.
  give(data) {
    const before = key(this.current);
    const p = parseGiven(data);
    this.given = p === null ? void 0 : { place: p };
    if (key(this.current) !== before) this.onChange();
    if (p === null) void this.refresh();
  }
  // Checks again; concurrent calls share one check, and a call during one
  // runs another after it.
  refresh() {
    if (this.given) return Promise.resolve();
    if (this.checking) {
      this.again = true;
      return this.checking;
    }
    this.checking = (async () => {
      do {
        this.again = false;
        let p;
        try {
          p = await this.detect();
        } catch (e) {
          this.onError(e);
          continue;
        }
        if (this.given) return;
        if (key(p) !== key(this.detected)) {
          this.detected = p;
          this.onChange();
        }
      } while (this.again);
    })().finally(() => this.checking = void 0);
    return this.checking;
  }
};
function key(p) {
  return p ? JSON.stringify([p.kind, p.group, p.groupNumber, p.window, p.windowNumber, p.pane, p.display]) : "";
}

// extension/src/launch.ts
var LAUNCH_MS = 5e3;
var LAUNCH_ENV = "PIRC_LAUNCH";
var LAUNCHER_EVENT = "pirc:launcher";
function parseLauncher(data) {
  if (data === null) return null;
  if (data === false) return void 0;
  const l = data;
  if (typeof l?.name !== "string" || !l.name.trim() || typeof l.launch !== "function") {
    throw new Error("pirc:launcher takes { name, launch({ cwd, command, env, name }) }, false, or null");
  }
  const launch = l.launch.bind(l);
  return { name: l.name.trim().slice(0, 64), launch: async (o) => void await launch(o) };
}
function piCommand(argv = process.argv, execPath = process.execPath) {
  const entry = argv[1];
  return entry && existsSync(entry) ? [execPath, entry] : ["pi"];
}
function launchEnv(env, launchId) {
  const out = {};
  for (const [k, v] of Object.entries(env)) {
    if (v === void 0 || !/^(PI|PIRC)_/.test(k) || k === "PIRC_TOKEN" || k === LAUNCH_ENV || k === "PI_CODING_AGENT") continue;
    out[k] = v;
  }
  out[LAUNCH_ENV] = launchId;
  return out;
}
function launchFolder(cwd, home = homedir2()) {
  const given = cwd.trim();
  if (!given) return { problem: "no folder given" };
  const path = given === "~" ? home : given.startsWith("~/") ? join4(home, given.slice(2)) : given;
  if (!path.startsWith("/")) return { problem: `not a full path: ${given}` };
  try {
    if (!statSync(path).isDirectory()) return { problem: `not a folder: ${path}` };
  } catch {
    return { problem: `no such folder: ${path}` };
  }
  return { path };
}
function launchName(name) {
  return name.replace(/[\p{Cc}\s]+/gu, " ").trim().slice(0, 64);
}
function tmuxLauncher(env, exec = run) {
  const pane = env.TMUX_PANE;
  if (!env.TMUX || !pane) return void 0;
  return {
    name: "tmux",
    async launch({ cwd, command, env: extra, name }) {
      const window = (await exec("tmux", ["display-message", "-p", "-t", pane, "#{window_id}"], env)).trim();
      if (!window) throw new Error("tmux did not say which window pi is in");
      const vars = Object.entries(extra).flatMap(([k, v]) => ["-e", `${k}=${v}`]);
      const named = name ? ["-n", name.replaceAll("#", "##")] : [];
      await exec("tmux", ["new-window", "-d", "-a", "-t", window, ...named, "-c", cwd, ...vars, "--", ...command], env);
    }
  };
}
function herdrLauncher(env, connect = herdrSession) {
  const at = herdrPane(env);
  if (!at) return void 0;
  return {
    name: "herdr",
    async launch({ cwd, command, env: extra, name }) {
      const h = connect(at.socket);
      const timer = setTimeout(() => h.close(), LAUNCH_MS);
      try {
        const { pane } = await h.ask("pane.current", { caller_pane_id: at.paneId });
        if (!pane?.workspace_id) throw new Error("herdr did not say which workspace pi is in");
        await h.ask("layout.apply", { workspace_id: pane.workspace_id, ...name ? { tab_label: name } : {}, focus: false, root: { type: "pane", cwd, command, env: extra } });
      } finally {
        clearTimeout(timer);
        h.close();
      }
    }
  };
}
function builtInLauncher(env = process.env) {
  return herdrLauncher(env) ?? tmuxLauncher(env);
}
var LauncherChoice = class {
  constructor(onChange, builtIn = builtInLauncher()) {
    this.onChange = onChange;
    this.builtIn = builtIn;
  }
  onChange;
  builtIn;
  given;
  get current() {
    return this.given ? this.given.launcher : this.builtIn;
  }
  // From the pirc:launcher event.
  give(data) {
    const before = this.current?.name ?? "";
    const l = parseLauncher(data);
    this.given = l === null ? void 0 : { launcher: l };
    if ((this.current?.name ?? "") !== before) this.onChange();
  }
};

// extension/src/live.ts
var ORIGIN = {
  startup: 1 /* STARTUP */,
  reload: 5 /* RELOAD */,
  new: 2 /* NEW */,
  resume: 3 /* RESUME */,
  fork: 4 /* FORK */
};
var DELTA_MS = 50;
var PROGRESS_MS = 250;
var PROMPT_ECHO_MS = 10 * 6e4;
var CONFIRM_MS = 3e4;
var STOP_DELAY_MS = 300;
var PERSIST_MS = 2e3;
var SHOWN = /* @__PURE__ */ new Set(["user", "assistant", "toolResult"]);
var cancelled = (what) => (r) => r.cancelled ? `another extension cancelled the ${what}` : void 0;
var SESSION_COMMANDS = {
  new: {
    name: "pirc:new",
    description: "PiRC: start a new session (used by PiRC's clients)",
    reason: "new",
    timeout: "pi did not start a new session",
    run: async (_args, ctx) => cancelled("new session")(await ctx.newSession())
  },
  // Before a user message, its entry ID the argument.
  fork: {
    name: "pirc:fork",
    description: "PiRC: fork before a user message (used by PiRC's clients)",
    reason: "fork",
    timeout: "pi did not fork the session",
    run: async (id, ctx) => forkProblem(ctx, id, "before") ?? cancelled("fork")(await ctx.fork(id))
  },
  clone: {
    name: "pirc:clone",
    description: "PiRC: clone the session as it is (used by PiRC's clients)",
    reason: "fork",
    timeout: "pi did not clone the session",
    run: async (_args, ctx) => {
      const leaf = ctx.sessionManager.getLeafId() ?? "";
      return forkProblem(ctx, leaf, "at") ?? cancelled("clone")(await ctx.fork(leaf, { position: "at" }));
    }
  },
  // A saved session, its file the argument.
  resume: {
    name: "pirc:resume",
    description: "PiRC: resume a saved session (used by PiRC's clients)",
    reason: "resume",
    timeout: "pi did not resume the session",
    run: async (path, ctx) => await resumeProblem(ctx, path) ?? cancelled("resume")(await ctx.switchSession(path))
  },
  // To an entry, its ID the argument, then "summarize" to summarise the
  // branch left first.
  tree: {
    name: "pirc:tree",
    description: "PiRC: move in the session tree (used by PiRC's clients)",
    timeout: "pi did not move in the session tree",
    run: async (args, ctx) => {
      const [id, summarize] = args.split(" ");
      return treeProblem(ctx, id) ?? cancelled("move in the session tree")(await ctx.navigateTree(id, { summarize: summarize === "summarize" }));
    }
  },
  reload: {
    name: "pirc:reload",
    description: "PiRC: reload pi's resources (used by PiRC's clients)",
    reason: "reload",
    timeout: "pi did not reload",
    run: async (_args, ctx) => {
      await ctx.reload();
      return void 0;
    }
  }
};
var reasonOf = (which) => SESSION_COMMANDS[which].reason;
var REQUESTS = {
  prompt: "change",
  abort: "change",
  setModel: "change",
  setThinkingLevel: "change",
  compact: "change",
  newSession: "change",
  fork: "change",
  clone: "change",
  resume: "change",
  reload: "change",
  navigateTree: "change",
  rename: "change",
  stop: "change",
  launch: "change",
  answer: "change",
  historyRequest: "question",
  listModels: "question",
  statsRequest: "question",
  listCommands: "question",
  listPastSessions: "question",
  listTree: "question"
};
function forkProblem(ctx, id, position) {
  const sm = ctx.sessionManager;
  const e = id ? sm.getEntry(id) : void 0;
  if (!e) return position === "at" ? "nothing to clone yet" : "no such entry in this session";
  if (position === "before" && !(e.type === "message" && e.message.role === "user")) return "not a user message of this session";
  const target = position === "at" ? e.id : e.parentId;
  const file = sm.getSessionFile();
  if (target && file && !existsSync2(file)) return "pi has not saved this session yet: it has no reply to keep";
  return void 0;
}
function treeProblem(ctx, id) {
  return id && ctx.sessionManager.getEntry(id) ? void 0 : "no such entry in this session";
}
async function pastSessions(ctx, allFolders) {
  const sm = ctx.sessionManager;
  const pi = sm.constructor;
  if (typeof pi.list !== "function" || typeof pi.listAll !== "function") throw new Error("this pi gives no way to list its sessions");
  const dir = sm.getSessionDir();
  if (!allFolders) return pi.list(sm.getCwd(), dir);
  return sm.usesDefaultSessionDir?.() === false ? pi.listAll(dir) : pi.listAll();
}
async function resumeProblem(ctx, path) {
  if (!path) return "no session given";
  if (path === ctx.sessionManager.getSessionFile()) return "pi has this session open already";
  const find = async (all) => (await pastSessions(ctx, all)).find((s) => s.path === path);
  const info = await find(false) ?? await find(true);
  if (!info) return "pi has no such saved session";
  if (info.cwd && !existsSync2(info.cwd)) return `its folder no longer exists: ${info.cwd}`;
  return void 0;
}
var BUILTIN_COMMANDS = /* @__PURE__ */ new Set([
  "settings",
  "model",
  "tree",
  "thinking",
  "scoped-models",
  "export",
  "import",
  "share",
  "bug",
  "copy",
  "name",
  "session",
  "changelog",
  "hotkeys",
  "fork",
  "clone",
  "trust",
  "login",
  "logout",
  "new",
  "compact",
  "resume",
  "reload",
  "quit"
]);
var ACTION_FOR = {
  model: "set model",
  thinking: "set thinking level",
  name: "rename",
  new: "new session",
  fork: "fork",
  clone: "clone",
  resume: "resume",
  reload: "reload",
  compact: "compact",
  session: "stats"
};
function commandName(text) {
  return text.startsWith("/") ? text.slice(1).split(/\s/, 1)[0] : void 0;
}
var isPircCommand = (name) => name === "pirc" || name.startsWith("pirc:");
function refusedCommand(name) {
  if (isPircCommand(name)) return `/${name} is PiRC's own command; it runs only in pi's terminal`;
  if (!BUILTIN_COMMANDS.has(name)) return void 0;
  const action = ACTION_FOR[name];
  return `pi's /${name} runs only in its terminal` + (action ? `; use the ${action} action` : "");
}
var SOURCE = {
  extension: 1 /* EXTENSION */,
  prompt: 2 /* PROMPT */,
  skill: 3 /* SKILL */
};
var Live = class {
  constructor(pi, ctx, sink, hostKey, instanceId, reason, replaces, versions, seq = 0n, notice = { notice: void 0, pushed: 0n }) {
    this.pi = pi;
    this.ctx = ctx;
    this.sink = sink;
    this.hostKey = hostKey;
    this.instanceId = instanceId;
    this.replaces = replaces;
    this.versions = versions;
    this.seq = seq;
    this.notice = notice;
    this.seenQuestions = new Set(sink.questions().map((q) => q.id));
    this.sessionId = ctx.sessionManager.getSessionId();
    this.origin = ORIGIN[reason] ?? 0 /* UNSPECIFIED */;
    const branch2 = ctx.sessionManager.getBranch();
    this.turnId = lastTurnId(branch2);
    this.firstPrompt = firstPrompt(branch2);
    this.working = !ctx.isIdle();
  }
  pi;
  ctx;
  sink;
  hostKey;
  instanceId;
  replaces;
  versions;
  sessionId;
  origin;
  seq;
  working = false;
  compacting = false;
  unconfirmed = [];
  // pi refuses prompts while it compacts; as its terminal does with what is
  // typed meanwhile, these wait, in order, until it has finished.
  held = [];
  releasing;
  // Sent the first to an idle pi: the rest wait for its run to start, or
  // for as long as a prompt may take to, not counting a compaction first.
  starting = false;
  startTimer;
  // A Compact being run, answered when pi finishes it.
  compaction;
  // A NewSession, Fork, Clone, Resume, Reload or NavigateTree under way
  // (SESSION_COMMANDS), answered when pi shuts this session down for its
  // command's reason, or for NavigateTree when its command has run. While
  // pi summarises the branch it leaves, the session is compacting.
  replacement;
  turnId;
  firstPrompt;
  pending = [];
  pendingTimer;
  assistantId = "";
  delta;
  deltaTimer;
  progress = /* @__PURE__ */ new Map();
  // When each running tool started, then how long it took, for a pi that
  // does not record it on the result (pi's agent core before 1.4).
  toolStarts = /* @__PURE__ */ new Map();
  toolTook = /* @__PURE__ */ new Map();
  prompts = [];
  disposed = false;
  // The announcement onAnnouncementChanged is sending, for the sink to send
  // as it is rather than build again.
  building;
  // The run's last reply, for the notice when it ends.
  reply;
  // The questions seen showing, so that only a new one raises a notice.
  seenQuestions;
  notice;
  // The same session after a reload, with pi's new objects.
  rebind(pi, ctx) {
    this.pi = pi;
    this.ctx = ctx;
  }
  get lastSeq() {
    return this.seq;
  }
  get ref() {
    return { hostKey: this.hostKey(), sessionId: this.sessionId, instanceId: this.instanceId };
  }
  announcement() {
    const sm = this.ctx.sessionManager;
    const model = this.ctx.model;
    const started = sm.getHeader()?.timestamp;
    return create(SessionAnnouncementSchema, {
      name: this.pi.getSessionName() ?? "",
      cwd: this.ctx.cwd,
      hostname: hostname2(),
      model: model && modelRef(model),
      thinkingLevel: thinkingLevel(this.pi.getThinkingLevel()) ?? 0 /* UNSPECIFIED */,
      working: this.working,
      compacting: this.compacting,
      startedAt: started ? atIso(started) : void 0,
      replacesSessionId: this.replaces,
      origin: this.origin,
      piVersion: this.versions.pi,
      extensionVersion: this.versions.extension,
      place: this.sink.place(),
      firstPrompt: this.firstPrompt,
      requests: Object.keys(REQUESTS).map(requestName),
      launcher: this.sink.launcher()?.name ?? "",
      launchId: this.sink.launchId,
      questions: this.sink.questions(),
      notice: this.notice.notice,
      ...this.usage()
    });
  }
  // What the session has cost and how full its context is, as Stats has
  // them.
  usage() {
    const usage = this.ctx.getContextUsage();
    return {
      cost: sessionTotals(this.ctx.sessionManager.getEntries()).cost,
      contextTokens: usage && usage.tokens !== null ? count(usage.tokens) : void 0,
      contextWindow: count(usage?.contextWindow ?? this.ctx.model?.contextWindow)
    };
  }
  announcementBytes() {
    return toBinary(SessionAnnouncementSchema, this.building ?? this.announcement());
  }
  dispose() {
    this.disposed = true;
    clearTimeout(this.pendingTimer);
    clearTimeout(this.deltaTimer);
    for (const p of this.progress.values()) clearTimeout(p.timer);
    clearImmediate(this.releasing);
    clearTimeout(this.startTimer);
    this.held = [];
    for (const u of this.unconfirmed.splice(0)) {
      clearTimeout(u.timer);
      u.respond(errorReply(u.requestId, 7 /* SESSION_GONE */, "the session ended before the prompt ran"));
    }
    this.compaction?.respond(errorReply("", 7 /* SESSION_GONE */, "the session ended before the compaction finished"));
    this.compaction = void 0;
    if (this.replacement) {
      clearTimeout(this.replacement.timer);
      this.replacement.respond(errorReply("", 7 /* SESSION_GONE */, "the session ended other than by the replacement asked for"));
      this.replacement = void 0;
    }
  }
  // pi is shutting this session down; a replacement waiting for that is
  // answered now, before the session's end goes out.
  onShutdown(reason) {
    const r = this.replacement;
    if (!r || reason !== reasonOf(r.which)) return;
    this.endReplacement();
    r.respond(accepted(""));
  }
  // One of SESSION_COMMANDS is running: one that keeps the session is
  // answered when it has run, however long that takes (a summary).
  onCommandStart(which) {
    const r = this.replacement;
    if (r?.which === which && !reasonOf(which)) clearTimeout(r.timer);
  }
  // One of SESSION_COMMANDS has run, failing (it was cancelled, or failed)
  // if failed says why.
  onCommandRan(which, failed) {
    const r = this.replacement;
    if (r?.which !== which || !failed && reasonOf(which)) return;
    this.endReplacement();
    r.respond(failed ? errorReply("", 13 /* PI_FAILED */, failed) : accepted(""));
  }
  endReplacement() {
    const r = this.replacement;
    if (!r) return;
    this.replacement = void 0;
    clearTimeout(r.timer);
    if (r.summarizing) this.onCompactEnd();
  }
  // The session moved in its tree, at a client's request or at pi's
  // terminal: clients ask for the conversation again.
  onTree(leafId) {
    this.catchUp();
    this.turnId = lastTurnId(this.ctx.sessionManager.getBranch());
    this.emit({ case: "branchChanged", value: { leafId: leafId ?? "" } });
    if (!this.replacement?.summarizing) this.onAnnouncementChanged();
  }
  // Runs a timer's work, keeping its errors from pi.
  guard(where, fn) {
    return () => {
      if (this.disposed) return;
      try {
        fn();
      } catch (e) {
        this.sink.fail(where, e);
      }
    };
  }
  // --- Events from pi -------------------------------------------------
  emit(body) {
    if (body.case !== "assistantDelta") this.flushDelta();
    this.seq++;
    this.sink.broadcast(this, create(SessionMessageSchema, {
      body: { case: "event", value: { seq: this.seq, at: timestampFromDate(/* @__PURE__ */ new Date()), body } }
    }));
  }
  emitItem(item) {
    this.emit({ case: "item", value: fitItem(item, this.sink.maxPayloadBytes() - 256) });
  }
  // Called first thing on every event: the messages that ended before it
  // are persisted by now (pi persists after its extension handlers return,
  // and awaits each event before the next), so their entries are known.
  catchUp() {
    this.resolvePending();
  }
  findEntry(message) {
    const entries = this.ctx.sessionManager.getEntries();
    for (let i = entries.length - 1, n = 0; i >= 0 && n < 200; i--, n++) {
      const e = entries[i];
      if (e.type === "message" && e.message === message) return e.id;
    }
    return void 0;
  }
  // Sends the finished messages in order once pi has persisted each; one
  // still not persisted after PERSIST_MS goes without an entry ID.
  resolvePending() {
    const now = Date.now();
    let replied = false;
    while (this.pending.length > 0) {
      const p = this.pending[0];
      const entryId = this.findEntry(p.message);
      if (entryId === void 0 && now - p.since < PERSIST_MS) break;
      this.pending.shift();
      if (p.message.role === "assistant") replied = true;
      if (p.message.role === "user" && entryId) this.turnId = entryId;
      if (p.message.role === "user" && !this.firstPrompt) {
        this.firstPrompt = firstLine(promptText(textOf(p.message.content)));
        if (this.firstPrompt) this.onAnnouncementChanged();
      }
      const at = atMs(p.message.timestamp);
      const m = p.took !== void 0 && p.message.durationMs === void 0 ? { ...p.message, durationMs: p.took } : p.message;
      for (const item of messageItems(m, { entryId: entryId ?? "", turnId: this.turnId, at }, p)) {
        this.emitItem(item);
      }
      if (p.requestId && entryId && photosOf(p.message).length > 0) {
        this.pi.appendEntry(PHOTO_ENTRY, { message: entryId });
      }
    }
    clearTimeout(this.pendingTimer);
    this.pendingTimer = void 0;
    if (replied && !this.disposed) this.onAnnouncementChanged();
    if (this.pending.length > 0 && !this.disposed) this.waitForPending();
  }
  // The last message of a run has no next event to resolve it: look again
  // shortly.
  waitForPending() {
    this.pendingTimer = setTimeout(this.guard("pending", () => {
      this.pendingTimer = void 0;
      this.resolvePending();
    }), 10);
  }
  onMessageStart(m) {
    this.catchUp();
    if (m.role === "assistant") {
      this.assistantId = "m-" + randomBytes2(8).toString("hex");
    }
  }
  onMessageUpdate(e) {
    this.catchUp();
    const ev = e.assistantMessageEvent;
    if (ev.type !== "text_delta" && ev.type !== "thinking_delta") return;
    const kind = ev.type === "text_delta" ? "text" : "thinking";
    const d = this.delta;
    if (d && d.messageId === this.assistantId && d.index === ev.contentIndex && d.kind === kind) {
      d.text += ev.delta;
      return;
    }
    this.flushDelta();
    this.delta = { messageId: this.assistantId, turnId: this.turnId, index: ev.contentIndex, kind, text: ev.delta };
    this.deltaTimer = setTimeout(this.guard("delta", () => this.flushDelta()), DELTA_MS);
  }
  flushDelta() {
    clearTimeout(this.deltaTimer);
    this.deltaTimer = void 0;
    const d = this.delta;
    if (!d) return;
    this.delta = void 0;
    this.emit({
      case: "assistantDelta",
      value: { messageId: d.messageId, turnId: d.turnId, blockIndex: d.index, body: { case: d.kind, value: d.text } }
    });
  }
  onMessageEnd(m) {
    this.catchUp();
    if (!SHOWN.has(m.role)) return;
    const p = { message: m, since: Date.now() };
    if (m.role === "toolResult") {
      p.took = this.toolTook.get(m.toolCallId);
      this.toolTook.delete(m.toolCallId);
    }
    if (m.role === "user") {
      p.requestId = this.matchPrompt(textOf(m.content), Array.isArray(m.content) && m.content.some((c) => c.type === "image"));
      if (p.requestId) this.confirm((u) => u.requestId === p.requestId);
      if (p.requestId) preparePhotos(photosOf(m));
    }
    if (m.role === "assistant") {
      p.messageId = this.assistantId;
      this.reply = m;
    }
    this.pending.push(p);
    if (!this.pendingTimer) this.waitForPending();
  }
  onToolUpdate(e) {
    this.catchUp();
    if (e.parentToolCallId) return;
    const text = clip(textOf(e.partialResult?.content), Math.floor(this.sink.maxPayloadBytes() / 4));
    let p = this.progress.get(e.toolCallId);
    if (!p) {
      p = { text, timer: void 0, sentAt: 0 };
      this.progress.set(e.toolCallId, p);
    }
    p.text = text;
    if (p.timer) return;
    const send = () => {
      p.timer = void 0;
      p.sentAt = Date.now();
      this.emit({ case: "toolProgress", value: { toolCallId: e.toolCallId, turnId: this.turnId, text: p.text } });
    };
    const wait = PROGRESS_MS - (Date.now() - p.sentAt);
    if (wait <= 0) send();
    else p.timer = setTimeout(this.guard("progress", send), wait);
  }
  onToolStart(toolCallId) {
    this.toolStarts.set(toolCallId, Date.now());
  }
  onToolEnd(toolCallId) {
    this.catchUp();
    const start = this.toolStarts.get(toolCallId);
    this.toolStarts.delete(toolCallId);
    if (start !== void 0) {
      if (this.toolTook.size > 100) this.toolTook.clear();
      this.toolTook.set(toolCallId, Date.now() - start);
    }
    const p = this.progress.get(toolCallId);
    if (p) clearTimeout(p.timer);
    this.progress.delete(toolCallId);
  }
  onWorking(working) {
    this.catchUp();
    if (working && !this.working) this.reply = void 0;
    if (!working && this.working) this.raise(turnNotice(this.reply, this.nextNumber()));
    if (working) {
      this.confirm((u, i) => i === 0 && u.text.startsWith("/"));
    } else if (!this.compaction) {
      this.compacting = false;
    }
    if (working) {
      clearTimeout(this.startTimer);
      this.starting = false;
    }
    this.release();
    if (working === this.working) return;
    this.working = working;
    this.emit({ case: "workingChanged", value: { working } });
    this.onAnnouncementChanged();
  }
  onAnnouncementChanged() {
    const a = this.announcement();
    this.emit({ case: "announcement", value: a });
    this.building = a;
    try {
      this.sink.announce(this);
    } finally {
      this.building = void 0;
    }
  }
  // pi refuses prompts while it compacts. A compaction before a prompt's
  // run (pi compacts first when the context is full) pauses its deadline.
  onCompactStart() {
    for (const u of this.unconfirmed) clearTimeout(u.timer);
    clearTimeout(this.startTimer);
    if (this.compacting) return;
    this.compacting = true;
    this.onAnnouncementChanged();
  }
  onCompactEnd() {
    if (!this.sink.questions().length) for (const u of this.unconfirmed) this.armConfirm(u);
    if (this.starting) this.armStart();
    this.release();
    if (!this.compacting) return;
    this.compacting = false;
    this.onAnnouncementChanged();
  }
  // A question an extension asks before a prompt's run (in
  // before_agent_start, say) holds the run up: the prompt's deadline waits
  // while one is asked.
  onQuestionsChanged() {
    const now = this.sink.questions();
    const fresh = now.filter((q) => !this.seenQuestions.has(q.id));
    this.seenQuestions = new Set(now.map((q) => q.id));
    if (fresh.length > 0) this.raise(questionNotice(fresh[fresh.length - 1], this.nextNumber()));
    const asking = now.length > 0;
    for (const u of this.unconfirmed) {
      if (asking) clearTimeout(u.timer);
      else if (!this.compacting) this.armConfirm(u);
    }
  }
  onCompact(entry) {
    this.catchUp();
    this.emitItem(compactionItem(entry, this.turnId));
    this.onCompactEnd();
  }
  // --- Requests from clients ------------------------------------------
  prunePrompts() {
    const now = Date.now();
    this.prompts = this.prompts.filter((p) => now - p.at < PROMPT_ECHO_MS);
  }
  // The request a user message echoes: the same text, or failing that the
  // oldest prompt it starts with, since pi appends notes to a prompt with
  // images ("[image resized]"), also to one with no text.
  matchPrompt(text, images) {
    this.prunePrompts();
    let i = this.prompts.findIndex((p) => p.text === text);
    if (i < 0) i = this.prompts.findIndex((p) => p.text === "" ? p.images && images : text.startsWith(p.text));
    if (i < 0) return void 0;
    return this.prompts.splice(i, 1)[0].requestId;
  }
  // Sends the held prompts once pi has finished compacting: pi clears its
  // compaction only after its hooks return, so not before then. An idle pi
  // starts a run with the first; the rest go once it has, as pi queues
  // only what comes mid-run.
  release() {
    if (this.held.length === 0 || this.releasing || this.starting) return;
    this.releasing = setImmediate(this.guard("release", () => {
      this.releasing = void 0;
      while (this.held.length > 0 && !this.compacting && !this.starting && !this.disposed) {
        const idle = this.ctx.isIdle();
        const h = this.held.shift();
        this.prunePrompts();
        this.prompts.push({ requestId: h.requestId, text: h.text, images: h.images, at: Date.now() });
        this.pi.sendUserMessage(h.content, { deliverAs: h.deliverAs, expandPromptTemplates: true });
        if (idle) {
          this.starting = true;
          this.armStart();
        }
      }
    }));
  }
  armStart() {
    clearTimeout(this.startTimer);
    this.startTimer = setTimeout(this.guard("start", () => {
      this.starting = false;
      this.release();
    }), CONFIRM_MS);
  }
  nextNumber() {
    return nextNumber(this.notice.notice?.number);
  }
  // A notice goes out with the next announcement.
  raise(n) {
    if (n) this.notice = { ...this.notice, notice: n };
  }
  // Answers Accepted to the unconfirmed prompts `which` picks.
  confirm(which) {
    const keep = [];
    this.unconfirmed.forEach((u, i) => {
      if (!which(u, i)) return keep.push(u);
      clearTimeout(u.timer);
      u.respond(accepted(u.requestId));
    });
    this.unconfirmed = keep;
  }
  armConfirm(u) {
    clearTimeout(u.timer);
    u.timer = setTimeout(this.guard("confirm", () => {
      this.unconfirmed = this.unconfirmed.filter((x) => x !== u);
      u.respond(errorReply(u.requestId, 9 /* TIMEOUT */, "pi did not start the prompt; it may have refused it (see pi's screen)"));
    }), CONFIRM_MS);
  }
  // Whether text runs an extension command, which pi handles at once, even
  // mid-run, and which starts no run.
  isCommand(text) {
    const name = commandName(text);
    if (name === void 0) return false;
    return this.pi.getCommands().some((c) => c.source === "extension" && c.name === name);
  }
  // Why compacting or replacing the session cannot start now, if so.
  busy() {
    if (this.compacting || this.compaction) return "pi is compacting the session";
    if (this.replacement) return this.replacement.which === "tree" ? "the session is moving in its tree" : "the session is being replaced";
    if (this.unconfirmed.length > 0 || this.held.length > 0) return "a prompt is starting";
    if (this.working || !this.ctx.isIdle()) return "the agent is working; stop it first";
    return void 0;
  }
  // Runs then with what a promise of pi's gives, unless the session has
  // ended by then; a rejection is answered PI_FAILED.
  whenSettled(requestId, where, p, respond, then) {
    p.then(
      (v) => {
        if (this.disposed) return respond(errorReply(requestId, 7 /* SESSION_GONE */, "the session ended"));
        this.guard(where, () => then(v))();
      },
      (e) => respond(errorReply(requestId, 13 /* PI_FAILED */, errorText(e)))
    );
  }
  // Changes the session through one of PiRC's commands, answered when pi
  // shuts this session down for its reason (onShutdown), or when it has
  // run (onCommandRan).
  replace(requestId, which, args, respond, summarizing = false) {
    const { name, timeout } = SESSION_COMMANDS[which];
    const command = args ? `/${name} ${args}` : `/${name}`;
    const why = this.busy();
    if (why) return respond(errorReply(requestId, 8 /* BUSY */, why));
    const timer = setTimeout(this.guard("replacement", () => {
      if (this.replacement?.timer !== timer) return;
      this.endReplacement();
      respond(errorReply(requestId, 9 /* TIMEOUT */, timeout));
    }), CONFIRM_MS);
    this.replacement = { respond: (r) => respond(withRequestId(r, requestId)), timer, which, summarizing };
    if (summarizing) this.onCompactStart();
    try {
      this.pi.sendUserMessage(command, { deliverAs: "followUp", expandPromptTemplates: true });
    } catch (e) {
      this.onCommandRan(which, errorText(e));
    }
  }
  // Handles one request, answering it through respond, now or later.
  onRequest(m, respond) {
    const body = m.body;
    switch (body.case) {
      case "prompt": {
        const { requestId, text, images, delivery } = body.value;
        if (!text && images.length === 0) return respond(errorReply(requestId, 4 /* INVALID */, "empty prompt"));
        const name = commandName(text);
        const refused = name === void 0 ? void 0 : refusedCommand(name);
        if (refused) return respond(errorReply(requestId, 4 /* INVALID */, refused));
        const command = images.length === 0 && this.isCommand(text);
        if (!command && !this.ctx.model) return respond(errorReply(requestId, 13 /* PI_FAILED */, "no model is selected in pi"));
        const content = images.length === 0 ? text : [
          ...text ? [{ type: "text", text }] : [],
          ...images.map((i) => ({ type: "image", mimeType: i.mimeType, data: Buffer.from(i.data).toString("base64") }))
        ];
        const deliverAs = delivery === 1 /* STEER */ ? "steer" : "followUp";
        if (!command && (this.compacting || this.held.length > 0)) {
          this.held.push({ requestId, text, images: images.length > 0, content, deliverAs });
          return respond(accepted(requestId));
        }
        const idle = this.ctx.isIdle();
        this.prunePrompts();
        if (!command) this.prompts.push({ requestId, text, images: images.length > 0, at: Date.now() });
        this.pi.sendUserMessage(content, { deliverAs, expandPromptTemplates: true });
        if (command || !idle) return respond(accepted(requestId));
        const u = { requestId, text, respond, timer: void 0 };
        this.unconfirmed.push(u);
        if (!this.compacting && !this.sink.questions().length) this.armConfirm(u);
        return;
      }
      case "abort":
        this.ctx.abort();
        return respond(accepted(body.value.requestId));
      case "historyRequest":
        return respond(this.history(body.value.requestId, body.value.limit, body.value.afterEntryId));
      case "listModels": {
        const current = this.ctx.model;
        return respond(create(SessionMessageSchema, {
          body: {
            case: "models",
            value: {
              requestId: body.value.requestId,
              models: this.ctx.modelRegistry.getAvailable().map(modelInfo),
              current: current && modelInfo(current)
            }
          }
        }));
      }
      case "setModel": {
        const { requestId, model } = body.value;
        if (!model?.provider || !model.id) return respond(errorReply(requestId, 4 /* INVALID */, "no model given"));
        const found = this.ctx.modelRegistry.find(model.provider, model.id);
        if (!found) return respond(errorReply(requestId, 4 /* INVALID */, `pi has no model ${model.provider}/${model.id}`));
        return this.whenSettled(requestId, "set model", this.pi.setModel(found), respond, (ok) => {
          if (!ok) return respond(errorReply(requestId, 13 /* PI_FAILED */, `pi has no credentials for ${model.provider}`));
          this.onAnnouncementChanged();
          respond(accepted(requestId));
        });
      }
      case "setThinkingLevel": {
        const { requestId, level } = body.value;
        const name = thinkingName(level);
        if (!name) return respond(errorReply(requestId, 4 /* INVALID */, "no thinking level given"));
        this.pi.setThinkingLevel(name);
        this.onAnnouncementChanged();
        return respond(accepted(requestId));
      }
      case "rename": {
        const { requestId } = body.value;
        const name = body.value.name.trim();
        if (!name) return respond(errorReply(requestId, 4 /* INVALID */, "empty name"));
        this.pi.setSessionName(name);
        this.onAnnouncementChanged();
        return respond(accepted(requestId));
      }
      case "compact": {
        const { requestId, instructions } = body.value;
        const why = this.busy();
        if (why) return respond(errorReply(requestId, 8 /* BUSY */, why));
        if (!this.ctx.model) return respond(errorReply(requestId, 13 /* PI_FAILED */, "no model is selected in pi"));
        const c = { respond: (r) => respond(withRequestId(r, requestId)) };
        this.compaction = c;
        this.onCompactStart();
        const finish = (reply) => this.guard("compact", () => {
          if (this.compaction !== c) return;
          this.compaction = void 0;
          this.onCompactEnd();
          c.respond(reply);
        })();
        this.ctx.compact({
          customInstructions: instructions || void 0,
          onComplete: () => finish(accepted(requestId)),
          onError: (e) => finish(errorReply(requestId, 13 /* PI_FAILED */, e.message))
        });
        return;
      }
      case "newSession":
        return this.replace(body.value.requestId, "new", "", respond);
      case "fork": {
        const { requestId, entryId } = body.value;
        const problem = forkProblem(this.ctx, entryId, "before");
        if (problem) return respond(errorReply(requestId, 4 /* INVALID */, problem));
        return this.replace(requestId, "fork", entryId, respond);
      }
      case "clone": {
        const { requestId } = body.value;
        const problem = forkProblem(this.ctx, this.ctx.sessionManager.getLeafId() ?? "", "at");
        if (problem) return respond(errorReply(requestId, 4 /* INVALID */, problem));
        return this.replace(requestId, "clone", "", respond);
      }
      case "listPastSessions": {
        const { requestId, allFolders } = body.value;
        return this.whenSettled(requestId, "past sessions", pastSessions(this.ctx, allFolders), respond, (all) => respond(this.pastSessions(requestId, all)));
      }
      case "resume": {
        const { requestId, path } = body.value;
        const why = this.busy();
        if (why) return respond(errorReply(requestId, 8 /* BUSY */, why));
        return this.whenSettled(requestId, "resume", resumeProblem(this.ctx, path), respond, (problem) => {
          if (problem) return respond(errorReply(requestId, 4 /* INVALID */, problem));
          this.replace(requestId, "resume", path, respond);
        });
      }
      case "reload":
        return this.replace(body.value.requestId, "reload", "", respond);
      case "navigateTree": {
        const { requestId, entryId, summarize } = body.value;
        const problem = treeProblem(this.ctx, entryId);
        if (problem) return respond(errorReply(requestId, 4 /* INVALID */, problem));
        if (summarize && !this.ctx.model) return respond(errorReply(requestId, 13 /* PI_FAILED */, "no model is selected in pi to summarise with"));
        return this.replace(requestId, "tree", summarize ? `${entryId} summarize` : entryId, respond, summarize);
      }
      case "listTree": {
        const { requestId } = body.value;
        const all = branches(this.ctx.sessionManager);
        return respond(fitting(all.slice().reverse(), this.sink.maxPayloadBytes() - 1024, (kept) => create(SessionMessageSchema, { body: { case: "tree", value: { requestId, branches: kept.slice().reverse(), truncated: kept.length < all.length } } })));
      }
      case "stop": {
        const { requestId } = body.value;
        const why = this.busy();
        if (why) return respond(errorReply(requestId, 8 /* BUSY */, why));
        respond(accepted(requestId));
        setTimeout(this.guard("stop", () => this.ctx.shutdown()), STOP_DELAY_MS);
        return;
      }
      case "launch": {
        const { requestId } = body.value;
        const launcher = this.sink.launcher();
        if (!launcher) return respond(errorReply(requestId, 4 /* INVALID */, "this pi cannot open another: it runs in neither tmux nor herdr, and no extension gives a launcher"));
        const folder = launchFolder(body.value.cwd);
        if ("problem" in folder) return respond(errorReply(requestId, 4 /* INVALID */, folder.problem));
        return this.whenSettled(requestId, "launch", launcher.launch({ cwd: folder.path, command: piCommand(), env: launchEnv(process.env, requestId), name: launchName(body.value.name) }), respond, () => respond(accepted(requestId)));
      }
      case "answer": {
        const { requestId } = body.value;
        const why = this.sink.answer(body.value);
        return respond(why ? errorReply(requestId, 4 /* INVALID */, why) : accepted(requestId));
      }
      case "statsRequest": {
        const usage = this.ctx.getContextUsage();
        return respond(create(SessionMessageSchema, {
          body: {
            case: "stats",
            value: {
              requestId: body.value.requestId,
              total: sessionTotals(this.ctx.sessionManager.getEntries()),
              contextTokens: usage && usage.tokens !== null ? count(usage.tokens) : void 0,
              contextWindow: count(usage?.contextWindow ?? this.ctx.model?.contextWindow)
            }
          }
        }));
      }
      case "listCommands":
        return respond(create(SessionMessageSchema, {
          body: {
            case: "commands",
            value: {
              requestId: body.value.requestId,
              commands: this.pi.getCommands().filter((c) => !isPircCommand(c.name)).map((c) => ({ name: c.name, description: c.description ?? "", source: SOURCE[c.source] ?? 0 /* UNSPECIFIED */ }))
            }
          }
        }));
      default:
        return respond(errorReply(m.requestId, 4 /* INVALID */, body.case ? `not a request: ${body.case}` : `this session's extension (${this.versions.extension}) does not take that request; update it`));
    }
  }
  // The saved sessions but this one, newest first, within one frame.
  pastSessions(requestId, all) {
    const budget = this.sink.maxPayloadBytes() - 1024;
    const current = this.ctx.sessionManager.getSessionFile();
    const shown2 = all.filter((s) => s.path !== current).map((s) => ({
      path: s.path,
      sessionId: s.id,
      cwd: s.cwd,
      name: s.name ?? "",
      firstPrompt: firstLine(promptText(s.firstMessage)),
      createdAt: timestampFromDate(s.created),
      modifiedAt: timestampFromDate(s.modified),
      messageCount: s.messageCount
    }));
    return fitting(shown2.slice().reverse(), budget, (kept) => create(SessionMessageSchema, {
      body: { case: "pastSessions", value: { requestId, sessions: kept.slice().reverse(), truncated: kept.length < shown2.length } }
    }));
  }
  // The conversation on the current branch, newest last, within one frame.
  history(requestId, limit, afterEntryId = "") {
    this.flushDelta();
    this.resolvePending();
    const budget = this.sink.maxPayloadBytes() - 1024;
    const all = historyItems(this.ctx.sessionManager.getBranch()).map((i) => fitItem(i, budget - 256));
    const at = afterEntryId ? all.findLastIndex((i) => i.entryId === afterEntryId) : -1;
    if (at >= 0 && (limit === 0 || all.length - at - 1 <= limit)) {
      const after = all.slice(at + 1);
      const m = fitting(after, budget, (kept) => create(SessionMessageSchema, { body: { case: "history", value: create(HistorySchema, { requestId, items: kept, seq: this.seq, fromEntry: true }) } }));
      if (m.body.case === "history" && m.body.value.items.length === after.length) return m;
    }
    const items = limit > 0 ? all.slice(-limit) : all;
    return fitting(items, budget, (kept) => create(SessionMessageSchema, { body: { case: "history", value: create(HistorySchema, { requestId, items: kept, seq: this.seq, truncated: kept.length < all.length }) } }));
  }
};
function fitting(items, budget, build) {
  let kept = items;
  let m = build(kept);
  while (kept.length > 0 && toBinary(SessionMessageSchema, m).length > budget) {
    kept = kept.slice(Math.max(1, Math.floor(kept.length / 8)));
    m = build(kept);
  }
  return m;
}
function errorText(e) {
  return e?.message ?? String(e);
}
function withRequestId(m, requestId) {
  if (m.body.case === "accepted" || m.body.case === "error") m.body.value.requestId = requestId;
  return m;
}

// extension/src/questions.ts
import { randomBytes as randomBytes3 } from "node:crypto";
var TEXT_MAX = 2e3;
var OPTION_MAX = 500;
var OPTIONS_MAX = 200;
var ORIGINALS = /* @__PURE__ */ Symbol.for("pirc.questions.originals");
var clip2 = (s, n) => s.length > n ? `${s.slice(0, n - 1)}\u2026` : s;
var Questions = class {
  constructor(onChange) {
    this.onChange = onChange;
  }
  onChange;
  pending = [];
  // Why wrapping failed, if it did.
  problem = "";
  // The questions now, oldest first.
  list() {
    return this.pending.map((p) => p.question);
  }
  // Wraps pi's ui object, if not already this extension's; again after a
  // newer load, or when pi makes a new one.
  install(ui, current) {
    try {
      const u = ui;
      const orig = u[ORIGINALS] ?? { select: u.select, confirm: u.confirm, input: u.input, editor: u.editor, custom: u.custom };
      if (u[ORIGINALS] && u.select.pirc === this) return;
      Object.defineProperty(u, ORIGINALS, { value: orig, configurable: true });
      const select = (title, options, opts) => current().ask({ kind: 1 /* SELECT */, title, options }, opts, (o) => orig.select.call(ui, title, options, o));
      select.pirc = this;
      u.select = select;
      u.confirm = (title, message, opts) => current().ask({ kind: 2 /* CONFIRM */, title, message }, opts, (o) => orig.confirm.call(ui, title, message, o));
      u.input = (title, placeholder, opts) => current().ask({ kind: 3 /* INPUT */, title, placeholder }, opts, (o) => orig.input.call(ui, title, placeholder, o));
      u.editor = (title, prefill) => current().show({ kind: 4 /* EDITOR */, title }, () => orig.editor.call(ui, title, prefill));
      u.custom = ((factory, options) => current().show({ kind: 5 /* CUSTOM */, title: "" }, () => orig.custom.call(ui, factory, options)));
      if (u.select !== select) throw new Error("pi's ui object cannot be changed");
      this.problem = "";
    } catch (e) {
      this.problem = `questions cannot be answered from clients: ${e.message}`;
    }
  }
  add(q, answerable) {
    const options = q.options ?? [];
    const fits = options.length <= OPTIONS_MAX;
    const p = {
      question: create(QuestionSchema, {
        id: randomBytes3(8).toString("hex"),
        kind: q.kind,
        title: clip2(q.title ?? "", TEXT_MAX),
        message: clip2(q.message ?? "", TEXT_MAX),
        options: fits ? options.map((o) => clip2(String(o), OPTION_MAX)) : [],
        placeholder: clip2(q.placeholder ?? "", TEXT_MAX),
        answerable: answerable && fits,
        askedAt: atMs(Date.now())
      }),
      ...q.options ? { options: q.options } : {}
    };
    this.pending.push(p);
    this.changed();
    return p;
  }
  remove(p) {
    const i = this.pending.indexOf(p);
    if (i < 0) return;
    this.pending.splice(i, 1);
    this.changed();
  }
  changed() {
    try {
      this.onChange();
    } catch {
    }
  }
  // Asked in the terminal and of clients; the first answer wins, and a
  // client's closes the terminal's dialog.
  ask(q, opts, run2) {
    const closing = new AbortController();
    const given = opts?.signal;
    if (given?.aborted) closing.abort();
    given?.addEventListener("abort", () => closing.abort(), { once: true });
    const p = this.add(q, true);
    return new Promise((resolve, reject) => {
      let settled = false;
      const settle = (f) => {
        if (settled) return;
        settled = true;
        this.remove(p);
        f();
      };
      p.answer = (value) => {
        settle(() => resolve(value));
        closing.abort();
      };
      run2({ ...opts, signal: closing.signal }).then((v) => settle(() => resolve(v)), (e) => settle(() => reject(e)));
    });
  }
  // Shown to clients until the terminal answers it.
  show(q, run2) {
    const p = this.add(q, false);
    return run2().finally(() => this.remove(p));
  }
  // A client's answer: why it cannot be taken, or undefined once given.
  answer(a) {
    const p = this.pending.find((x) => x.question.id === a.questionId);
    if (!p) return "that question is no longer asked";
    if (!p.question.answerable || !p.answer) return "that question can be answered only in pi's terminal";
    const v = a.value;
    if (v.case === "dismissed") {
      p.answer(p.question.kind === 2 /* CONFIRM */ ? false : void 0);
      return void 0;
    }
    switch (p.question.kind) {
      case 1 /* SELECT */: {
        if (v.case !== "option" || v.value >= (p.options?.length ?? 0)) return "a select is answered with one of its options";
        p.answer(p.options[v.value]);
        return void 0;
      }
      case 2 /* CONFIRM */:
        if (v.case !== "confirmed") return "a confirm is answered yes or no";
        p.answer(v.value);
        return void 0;
      case 3 /* INPUT */:
        if (v.case !== "text") return "an input is answered with text";
        p.answer(v.value);
        return void 0;
      default:
        return "that question can be answered only in pi's terminal";
    }
  }
};

// extension/src/host.ts
var isChange = (c) => c !== void 0 && Object.hasOwn(REQUESTS, c) && REQUESTS[c] === "change";
var IDEMPOTENCY_ENTRIES = 1e3;
var RETRYABLE = /* @__PURE__ */ new Set([8 /* BUSY */, 9 /* TIMEOUT */, 13 /* PI_FAILED */, 4 /* INVALID */, 7 /* SESSION_GONE */]);
var HANDOVER_MS = 3e4;
var HANDOVER_AFTER_ANNOUNCE_MS = 2e3;
var Host = class _Host {
  constructor(instanceId, versions) {
    this.instanceId = instanceId;
    this.versions = versions;
  }
  instanceId;
  versions;
  config;
  key;
  conn;
  state = { kind: "stopped" };
  live;
  // A session paused by a reload, until it starts again.
  suspended;
  previousSessionId = "";
  // A request still waiting for its outcome is "pending": a repeat of it is
  // neither run nor answered, since the first one's answer, to the same
  // client and request ID, is still to come.
  replies = /* @__PURE__ */ new Map();
  // Where each session's sequence numbers left off, for a return to it.
  seqs = /* @__PURE__ */ new Map();
  // And each one's notice, so that one is pushed once.
  notices = /* @__PURE__ */ new Map();
  lastError = "";
  // Where the process runs, announced with its session; checked again on
  // activity (bind, a turn, a reconnect, a client's request).
  places = new PlaceTracker(
    // Not connected, an event would be lost, leaving a gap in the sequence
    // numbers; the announcement on connecting carries the place anyway.
    () => {
      if (this.state.kind === "ready") this.live?.onAnnouncementChanged();
    },
    (e) => this.fail("place", e)
  );
  // What opens a new pi beside this one; another extension can change it.
  launchers = new LauncherChoice(() => {
    if (this.state.kind === "ready") this.live?.onAnnouncementChanged();
  });
  // The dialogs pi is showing for extensions, asked of clients too.
  dialogs = new Questions(() => {
    this.live?.onQuestionsChanged();
    if (this.state.kind === "ready") this.live?.onAnnouncementChanged();
  });
  // The Launch that started this process, if one did.
  launchId = process.env[LAUNCH_ENV] ?? "";
  // The host this one took over from, until it is let go (HANDOVER_MS).
  predecessor;
  // A host for this process, taking over from the one another version of
  // the extension made, if any: the same instance, with sequence numbers
  // carrying on, so clients see the session continue. The old host keeps
  // its connection, and its session (answering requests BUSY, as during
  // any reload), until this one has announced: the relay ends the sessions
  // of a connection that closes, but lets a newer one take a session over.
  static succeeding(previous, instanceId, versions) {
    const p = previous;
    const host = new _Host(p?.instanceId ?? instanceId, versions);
    if (!p) return host;
    for (const [id, seq] of p.seqs ?? []) host.seqs.set(id, seq);
    for (const [id, n] of p.notices ?? []) host.notices.set(id, n);
    for (const live of [p.suspended, p.live]) {
      if (!live) continue;
      host.seqs.set(live.sessionId, live.lastSeq);
      if (live.notice) host.notices.set(live.sessionId, live.notice);
    }
    const timer = setTimeout(() => host.releasePredecessor(), HANDOVER_MS);
    timer.unref();
    host.predecessor = { host: p, timer, announced: false };
    return host;
  }
  releasePredecessor() {
    const p = this.predecessor;
    if (!p) return;
    this.predecessor = void 0;
    clearTimeout(p.timer);
    const old = p.host;
    try {
      const lives = [old.suspended, old.live];
      old.live = old.suspended = void 0;
      for (const live of lives) live?.dispose();
      old.conn?.stop();
    } catch (e) {
      this.fail("previous version", e);
    }
  }
  // Lets the predecessor go shortly after this host first announces.
  announced() {
    const p = this.predecessor;
    if (!p || p.announced) return;
    p.announced = true;
    clearTimeout(p.timer);
    p.timer = setTimeout(() => this.releasePredecessor(), HANDOVER_AFTER_ANNOUNCE_MS);
    p.timer.unref();
  }
  // The live session that `pi` belongs to, if it is still current.
  liveFor(pi) {
    return this.live?.pi === pi ? this.live : void 0;
  }
  log(msg) {
    const path = process.env.PIRC_LOG;
    if (!path) return;
    try {
      appendFileSync(path, `${(/* @__PURE__ */ new Date()).toISOString()} [${process.pid}] ${msg}
`);
    } catch {
    }
  }
  fail(where, e) {
    this.lastError = `${where}: ${e?.message ?? e}`;
    this.log(this.lastError);
  }
  bind(pi, ctx, ev) {
    const id = ctx.sessionManager.getSessionId();
    if (this.suspended?.sessionId === id) {
      this.live = this.suspended;
      this.live.rebind(pi, ctx);
    } else if (this.live?.sessionId === id) {
      this.live.rebind(pi, ctx);
    } else {
      if (this.suspended) this.endSession(this.suspended);
      if (this.live) this.endSession(this.live);
      this.live = new Live(pi, ctx, this, () => this.key?.publicKey ?? new Uint8Array(), this.instanceId, ev.reason, this.previousSessionId, this.versions, this.seqs.get(id), this.notices.get(id));
    }
    this.suspended = void 0;
    this.log(`session ${id} (${ev.reason})`);
    void this.places.refresh();
    if (!this.conn) this.connect();
    else if (this.state.kind === "ready") this.announce(this.live);
    this.showStatus();
  }
  unbind(pi, reason) {
    const live = this.liveFor(pi);
    if (!live) return;
    this.live = void 0;
    if (reason === "reload") {
      this.suspended = live;
      live.onShutdown(reason);
      return;
    }
    this.previousSessionId = live.sessionId;
    live.onShutdown(reason);
    this.endSession(live);
    if (reason === "quit") {
      this.conn?.stop();
      this.releasePredecessor();
    }
  }
  endSession(live) {
    this.seqs.set(live.sessionId, live.lastSeq);
    this.notices.set(live.sessionId, live.notice);
    live.dispose();
    this.conn?.send(create(FrameSchema, { body: { case: "sessionEnd", value: { session: live.ref } } }));
  }
  // (Re)connects with the current configuration; token, when given, is a
  // registration token from /pirc enrol.
  connect(token) {
    this.conn?.stop();
    this.conn = void 0;
    let config;
    try {
      config = loadConfig();
    } catch (e) {
      this.fail("config", e);
      return this.showStatus();
    }
    this.config = config;
    if (!config.relay || config.removed) return this.showStatus();
    try {
      this.key = loadOrCreateKey(config.keyFile);
    } catch (e) {
      this.fail("host key", e);
      return this.showStatus();
    }
    try {
      this.conn = new RelayConnection({
        url: config.relay,
        role: "host",
        key: this.key,
        token: token ?? config.token,
        label: config.label,
        software: `pirc-extension/${this.versions.extension}`,
        onFrame: (f) => this.onFrame(f),
        onState: (s) => this.onState(s),
        onRegistered: () => this.log("connected with the registration token"),
        onError: (where, e) => this.fail(where, e)
      });
    } catch (e) {
      this.fail("relay", e);
      return this.showStatus();
    }
    this.conn.start();
  }
  onState(s) {
    this.state = s;
    this.log(`relay ${s.kind}${"reason" in s ? `: ${s.reason}` : ""}`);
    if (s.kind === "refused" && s.removed && this.config) {
      const at = /* @__PURE__ */ new Date();
      this.config = { ...this.config, removed: at.toISOString() };
      try {
        saveRemoved(at);
      } catch (e) {
        this.fail("config", e);
      }
    }
    if (s.kind === "ready") {
      if (this.live) this.announce(this.live);
      if (this.suspended) this.announce(this.suspended);
      void this.places.refresh();
    }
    this.showStatus();
  }
  statusText() {
    const s = this.state;
    if (!this.config?.relay) return "pirc: not enrolled";
    if (this.config.removed) return "pirc: removed from the relay";
    switch (s.kind) {
      case "ready":
        return "pirc: online";
      case "connecting":
        return "pirc: connecting";
      case "offline":
        return "pirc: offline";
      case "pending":
        return "pirc: awaiting approval";
      case "refused":
        return "pirc: refused";
      case "stopped":
        return "pirc: off";
    }
  }
  statusReport() {
    const lines = [this.statusText()];
    const c = this.config;
    if (c) {
      lines.push(`config ${c.path}`);
      if (c.relay) lines.push(`relay ${c.relay}`);
      lines.push(`key ${c.keyFile}${this.key ? ` (${Buffer.from(this.key.publicKey).toString("base64url")})` : ""}`);
      lines.push(`label asked for ${c.label} (the relay's name for this machine may differ: pirc-relay list)`);
    }
    if ("reason" in this.state) lines.push(`relay said: ${this.state.reason}`);
    if (this.live) lines.push(`session ${this.live.sessionId}, instance ${this.instanceId}`);
    if (this.dialogs.problem) lines.push(this.dialogs.problem);
    if (this.lastError) lines.push(`last error: ${this.lastError}`);
    if (c?.removed) lines.push(`removed from the relay ${c.removed}; to join again: /pirc enrol <relay-url> [token]`);
    if (!c?.relay) lines.push("enrol with: /pirc enrol <relay-url> [token]; without a token, approve this key in the web app or with pirc-relay approve");
    return lines.join("\n");
  }
  // The footer shows only what needs attention: online, the usual state,
  // takes no line.
  showStatus() {
    try {
      this.live?.ctx.ui.setStatus("pirc", this.state.kind === "ready" && this.config?.relay && !this.config.removed ? void 0 : this.statusText());
    } catch {
    }
  }
  // An entry of the session the extension has, through whichever load of
  // it has the session (bind): a photo's message.
  entry(id) {
    return this.live?.ctx.sessionManager.getEntry(id);
  }
  // Has pi draw its screen again, for a photo's PNG made after pi drew its
  // entry. pi gives an entry's renderer no way to ask for that, but setting
  // the footer status always redraws, so the status is set again as it is
  // (docs/design.md, section 8).
  redraw() {
    this.showStatus();
  }
  // --- Sink -------------------------------------------------------------
  routed(session, clientKey, m) {
    this.conn?.send(create(FrameSchema, {
      body: { case: "routed", value: { session, clientKey, payload: toBinary(SessionMessageSchema, m) } }
    }));
  }
  broadcast(live, m) {
    if (live === this.live) this.routed(live.ref, new Uint8Array(), m);
  }
  reply(live, clientKey, m) {
    this.routed(live.ref, clientKey, m);
  }
  // With push set for a notice not yet announced with it, as one raised
  // while the relay was out of reach (docs/design.md, section 12, step 13).
  announce(live) {
    if (this.state.kind !== "ready") return;
    const number = live.notice.notice?.number;
    const push = number !== void 0 && number > live.notice.pushed;
    let sent;
    try {
      sent = this.conn?.send(create(FrameSchema, {
        body: { case: "sessionAnnounce", value: { session: live.ref, payload: live.announcementBytes(), push } }
      }));
    } catch (e) {
      this.fail("announce", e);
      return;
    }
    if (!sent) return;
    if (push) live.notice = { ...live.notice, pushed: number };
    this.announced();
  }
  place() {
    return this.places.current;
  }
  launcher() {
    return this.launchers.current;
  }
  questions() {
    return this.dialogs.list();
  }
  answer(a) {
    return this.dialogs.answer(a);
  }
  maxPayloadBytes() {
    return this.state.kind === "ready" ? this.state.maxFrameBytes - 512 : 1 << 20;
  }
  // --- Frames from the relay ------------------------------------------
  onFrame(f) {
    const body = f.body;
    if (body.case === "error") {
      this.lastError = `relay: ${body.value.message}`;
      this.log(this.lastError);
      return;
    }
    if (body.case !== "routed") return;
    const { session, clientKey, payload } = body.value;
    let m;
    try {
      m = fromBinary(SessionMessageSchema, payload);
    } catch {
      if (session) this.routed(session, clientKey, errorReply("", 4 /* INVALID */, "undecodable message"));
      return;
    }
    if (!session || !this.key || !sameBytes(session.hostKey, this.key.publicKey)) return;
    const is = (l) => l !== void 0 && session.sessionId === l.sessionId && session.instanceId === l.instanceId;
    if (is(this.suspended)) {
      this.routed(session, clientKey, errorReply(messageRequestId(m), 8 /* BUSY */, "pi is reloading; try again shortly"));
      return;
    }
    const live = this.live;
    if (!is(live)) {
      this.routed(session, clientKey, errorReply(messageRequestId(m), 7 /* SESSION_GONE */, "session is no longer live in this process"));
      return;
    }
    const idem = isChange(m.body.case) ? `${live.sessionId}/${hex(clientKey)}/${messageRequestId(m)}` : void 0;
    const seen = idem && this.replies.get(idem);
    if (seen === "pending") return;
    if (seen) return this.reply(live, clientKey, seen);
    if (idem) this.remember(idem, "pending");
    let answered = false;
    const respond = (reply) => {
      if (answered) return;
      answered = true;
      if (idem) {
        const failed = reply.body.case === "error" && RETRYABLE.has(reply.body.value.code);
        if (failed) this.replies.delete(idem);
        else this.remember(idem, reply);
      }
      this.reply(live, clientKey, reply);
    };
    void this.places.refresh();
    try {
      live.onRequest(m, respond);
    } catch (e) {
      this.fail("request", e);
      respond(errorReply(messageRequestId(m), 13 /* PI_FAILED */, errorText(e)));
    }
  }
  remember(key2, v) {
    this.replies.delete(key2);
    this.replies.set(key2, v);
    if (this.replies.size > IDEMPOTENCY_ENTRIES) this.replies.delete(this.replies.keys().next().value);
  }
};

// extension/src/index.ts
var EXTENSION_VERSION = true ? "0.3.2-dev+a3abbba8df6f" : "dev";
var LOAD = true ? "0.3.2-dev+a3abbba8df6f" : `dev ${randomBytes4(4).toString("hex")}`;
var KEY = /* @__PURE__ */ Symbol.for("pirc.extension");
var proc = globalThis[KEY] ??= {};
if (!proc.host || proc.load !== LOAD) {
  proc.host = Host.succeeding(proc.host, randomBytes4(8).toString("hex"), { pi: piVersion(), extension: EXTENSION_VERSION });
  proc.load = LOAD;
}
var USAGE = "usage: /pirc [status | enrol <relay-url> [token] | reconnect]";
async function index_default(pi) {
  let active = false;
  const on = (where, fn) => (e) => {
    const live = proc.host.liveFor(pi);
    if (!live) return;
    try {
      fn(live, e);
    } catch (err) {
      proc.host.fail(where, err);
    }
  };
  const photos = await loadPhotos(globalThis[/* @__PURE__ */ Symbol.for("pirc.piParts")]);
  pi.registerEntryRenderer(PHOTO_ENTRY, photoRenderer(
    (id) => {
      const e = proc.host.entry?.(id);
      return e?.type === "message" ? e.message : void 0;
    },
    () => pi.getSettings()
  ));
  onConverted(() => proc.host.redraw());
  pi.on("session_start", (e, ctx) => {
    if (ctx.mode !== "tui") return;
    active = true;
    try {
      if (photos.problem && !proc.photosProblem) {
        proc.photosProblem = photos.problem;
        proc.host.fail("photos", new Error(photos.problem));
        ctx.ui.notify(`pirc: clients' photos cannot be shown in this pi's chat: ${photos.problem}`, "warning");
      }
      proc.host.dialogs.install(ctx.ui, () => proc.host.dialogs);
      proc.host.bind(pi, ctx, e);
      proc.host.log(`photos: ${photos.from}`);
      proc.host.redraw();
    } catch (err) {
      proc.host.fail("session_start", err);
    }
  });
  pi.on("session_shutdown", (e) => {
    if (!active) return;
    try {
      proc.host.unbind(pi, e.reason);
    } catch (err) {
      proc.host.fail("session_shutdown", err);
    }
  });
  pi.on("message_start", on("message_start", (live, e) => live.onMessageStart(e.message)));
  pi.on("message_update", on("message_update", (live, e) => live.onMessageUpdate(e)));
  pi.on("message_end", on("message_end", (live, e) => live.onMessageEnd(e.message)));
  pi.on("tool_execution_start", on("tool_execution_start", (live, e) => live.onToolStart(e.toolCallId)));
  pi.on("tool_execution_update", on("tool_execution_update", (live, e) => live.onToolUpdate(e)));
  pi.on("tool_execution_end", on("tool_execution_end", (live, e) => live.onToolEnd(e.toolCallId)));
  pi.on("agent_start", on("agent_start", (live) => {
    proc.host.dialogs.install(live.ctx.ui, () => proc.host.dialogs);
    live.onWorking(true);
    void proc.host.places.refresh();
  }));
  pi.on("agent_settled", on("agent_settled", (live) => {
    live.onWorking(false);
    void proc.host.places.refresh();
  }));
  proc.stopPlace?.();
  proc.stopPlace = pi.events.on(PLACE_EVENT, (data) => {
    try {
      proc.host.places.give(data);
    } catch (err) {
      proc.host.fail(PLACE_EVENT, err);
    }
  });
  proc.stopLauncher?.();
  proc.stopLauncher = pi.events.on(LAUNCHER_EVENT, (data) => {
    try {
      proc.host.launchers.give(data);
    } catch (err) {
      proc.host.fail(LAUNCHER_EVENT, err);
    }
  });
  pi.on("session_info_changed", on("session_info_changed", (live) => live.onAnnouncementChanged()));
  pi.on("model_select", on("model_select", (live) => live.onAnnouncementChanged()));
  pi.on("thinking_level_select", on("thinking_level_select", (live) => live.onAnnouncementChanged()));
  pi.on("session_before_compact", on("session_before_compact", (live) => live.onCompactStart()));
  pi.on("session_compact", on("session_compact", (live, e) => live.onCompact(e.compactionEntry)));
  pi.on("session_compact_failed", on("session_compact_failed", (live) => live.onCompactEnd()));
  pi.on("session_tree", on("session_tree", (live, e) => live.onTree(e.newLeafId)));
  for (const [which, c] of Object.entries(SESSION_COMMANDS)) {
    pi.registerCommand(c.name, {
      description: c.description,
      handler: async (args, ctx) => {
        proc.host.liveFor(pi)?.onCommandStart(which);
        let failed;
        try {
          failed = await c.run(args.trim(), ctx);
        } catch (err) {
          failed = errorText(err);
        }
        proc.host.liveFor(pi)?.onCommandRan(which, failed);
      }
    });
  }
  pi.registerCommand("pirc", {
    description: "PiRC: status, enrol <relay-url> [token], reconnect",
    handler: async (args, ctx) => {
      const [sub = "status", ...rest] = args.trim().split(/\s+/).filter(Boolean);
      switch (sub) {
        case "status":
          ctx.ui.notify(proc.host.statusReport(), "info");
          return;
        case "enrol":
        case "enroll": {
          const [url, token] = rest;
          if (!url || rest.length > 2) return ctx.ui.notify(USAGE, "error");
          try {
            relayURL(url);
            saveRelay(url);
          } catch (err) {
            return ctx.ui.notify(`pirc: ${err.message}`, "error");
          }
          proc.host.connect(token);
          ctx.ui.notify(`pirc: enrolling with ${url}; /pirc status shows the result`, "info");
          return;
        }
        case "reconnect":
          proc.host.connect();
          ctx.ui.notify("pirc: reconnecting", "info");
          return;
        default:
          ctx.ui.notify(USAGE, "error");
      }
    }
  });
}
export {
  index_default as default
};
