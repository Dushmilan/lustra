/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./contexts/CartContext.tsx":
/*!**********************************!*\
  !*** ./contexts/CartContext.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CartProvider: () => (/* binding */ CartProvider),\n/* harmony export */   useCart: () => (/* binding */ useCart)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nconst CartProvider = ({ children })=>{\n    const [cartItems, setCartItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const addToCart = (product, quantity, size, color)=>{\n        const existingItem = cartItems.find((item)=>item.id === product.id);\n        if (existingItem) {\n            setCartItems((prevItems)=>prevItems.map((item)=>item.id === product.id ? {\n                        ...item,\n                        quantity: item.quantity + quantity\n                    } : item));\n        } else {\n            const cartItem = {\n                id: product.id,\n                name: product.name,\n                price: product.price,\n                imageUrl: product.imageUrl,\n                category: product.category,\n                quantity,\n                selectedSize: size,\n                selectedColor: color\n            };\n            setCartItems((prevItems)=>[\n                    ...prevItems,\n                    cartItem\n                ]);\n        }\n    };\n    const removeFromCart = (productId)=>{\n        setCartItems((prevItems)=>prevItems.filter((item)=>item.id !== productId));\n    };\n    const updateQuantity = (productId, quantity)=>{\n        setCartItems((prevItems)=>prevItems.map((item)=>item.id === productId ? {\n                    ...item,\n                    quantity\n                } : item));\n    };\n    const clearCart = ()=>{\n        setCartItems([]);\n    };\n    const totalItems = cartItems.reduce((sum, item)=>sum + item.quantity, 0);\n    const totalPrice = cartItems.reduce((sum, item)=>sum + item.price * item.quantity, 0);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CartContext.Provider, {\n        value: {\n            cartItems,\n            addToCart,\n            removeFromCart,\n            updateQuantity,\n            clearCart,\n            totalItems,\n            totalPrice\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Administrator\\\\Desktop\\\\Lustra\\\\Frontend\\\\lustra\\\\contexts\\\\CartContext.tsx\",\n        lineNumber: 77,\n        columnNumber: 5\n    }, undefined);\n};\nconst useCart = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CartContext);\n    if (context === undefined) {\n        throw new Error('useCart must be used within a CartProvider');\n    }\n    return context;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHRzL0NhcnRDb250ZXh0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQThFO0FBd0I5RSxNQUFNSSw0QkFBY0gsb0RBQWFBLENBQThCSTtBQUV4RCxNQUFNQyxlQUF3RCxDQUFDLEVBQUVDLFFBQVEsRUFBRTtJQUNoRixNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR04sK0NBQVFBLENBQWEsRUFBRTtJQUV6RCxNQUFNTyxZQUFZLENBQUNDLFNBQWtCQyxVQUFrQkMsTUFBY0M7UUFDbkUsTUFBTUMsZUFBZVAsVUFBVVEsSUFBSSxDQUFDQyxDQUFBQSxPQUFRQSxLQUFLQyxFQUFFLEtBQUtQLFFBQVFPLEVBQUU7UUFDbEUsSUFBSUgsY0FBYztZQUNoQk4sYUFBYVUsQ0FBQUEsWUFDWEEsVUFBVUMsR0FBRyxDQUFDSCxDQUFBQSxPQUNaQSxLQUFLQyxFQUFFLEtBQUtQLFFBQVFPLEVBQUUsR0FDbEI7d0JBQUUsR0FBR0QsSUFBSTt3QkFBRUwsVUFBVUssS0FBS0wsUUFBUSxHQUFHQTtvQkFBUyxJQUM5Q0s7UUFHVixPQUFPO1lBQ0wsTUFBTUksV0FBcUI7Z0JBQ3pCSCxJQUFJUCxRQUFRTyxFQUFFO2dCQUNkSSxNQUFNWCxRQUFRVyxJQUFJO2dCQUNsQkMsT0FBT1osUUFBUVksS0FBSztnQkFDcEJDLFVBQVViLFFBQVFhLFFBQVE7Z0JBQzFCQyxVQUFVZCxRQUFRYyxRQUFRO2dCQUMxQmI7Z0JBQ0FjLGNBQWNiO2dCQUNkYyxlQUFlYjtZQUNqQjtZQUNBTCxhQUFhVSxDQUFBQSxZQUFhO3VCQUFJQTtvQkFBV0U7aUJBQVM7UUFDcEQ7SUFDRjtJQUVBLE1BQU1PLGlCQUFpQixDQUFDQztRQUN0QnBCLGFBQWFVLENBQUFBLFlBQWFBLFVBQVVXLE1BQU0sQ0FBQ2IsQ0FBQUEsT0FBUUEsS0FBS0MsRUFBRSxLQUFLVztJQUNqRTtJQUVBLE1BQU1FLGlCQUFpQixDQUFDRixXQUFtQmpCO1FBQ3pDSCxhQUFhVSxDQUFBQSxZQUNYQSxVQUFVQyxHQUFHLENBQUNILENBQUFBLE9BQ1pBLEtBQUtDLEVBQUUsS0FBS1csWUFDUjtvQkFBRSxHQUFHWixJQUFJO29CQUFFTDtnQkFBUyxJQUNwQks7SUFHVjtJQUVBLE1BQU1lLFlBQVk7UUFDaEJ2QixhQUFhLEVBQUU7SUFDakI7SUFFQSxNQUFNd0IsYUFBYXpCLFVBQVUwQixNQUFNLENBQUMsQ0FBQ0MsS0FBS2xCLE9BQVNrQixNQUFNbEIsS0FBS0wsUUFBUSxFQUFFO0lBQ3hFLE1BQU13QixhQUFhNUIsVUFBVTBCLE1BQU0sQ0FBQyxDQUFDQyxLQUFLbEIsT0FBU2tCLE1BQU9sQixLQUFLTSxLQUFLLEdBQUdOLEtBQUtMLFFBQVEsRUFBRztJQUV2RixxQkFDRSw4REFBQ1IsWUFBWWlDLFFBQVE7UUFDbkJDLE9BQU87WUFDTDlCO1lBQ0FFO1lBQ0FrQjtZQUNBRztZQUNBQztZQUNBQztZQUNBRztRQUNGO2tCQUVDN0I7Ozs7OztBQUdQLEVBQUU7QUFFSyxNQUFNZ0MsVUFBVTtJQUNyQixNQUFNQyxVQUFVdEMsaURBQVVBLENBQUNFO0lBQzNCLElBQUlvQyxZQUFZbkMsV0FBVztRQUN6QixNQUFNLElBQUlvQyxNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Q7QUFDVCxFQUFFIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFkbWluaXN0cmF0b3JcXERlc2t0b3BcXEx1c3RyYVxcRnJvbnRlbmRcXGx1c3RyYVxcY29udGV4dHNcXENhcnRDb250ZXh0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uL3R5cGVzL1Byb2R1Y3QnO1xyXG5cclxuaW50ZXJmYWNlIENhcnRJdGVtIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBwcmljZTogbnVtYmVyO1xyXG4gIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgY2F0ZWdvcnk6IHN0cmluZztcclxuICBxdWFudGl0eTogbnVtYmVyO1xyXG4gIHNlbGVjdGVkU2l6ZTogc3RyaW5nO1xyXG4gIHNlbGVjdGVkQ29sb3I6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIENhcnRDb250ZXh0VHlwZSB7XHJcbiAgY2FydEl0ZW1zOiBDYXJ0SXRlbVtdO1xyXG4gIGFkZFRvQ2FydDogKHByb2R1Y3Q6IFByb2R1Y3QsIHF1YW50aXR5OiBudW1iZXIsIHNpemU6IHN0cmluZywgY29sb3I6IHN0cmluZykgPT4gdm9pZDtcclxuICByZW1vdmVGcm9tQ2FydDogKHByb2R1Y3RJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHVwZGF0ZVF1YW50aXR5OiAocHJvZHVjdElkOiBzdHJpbmcsIHF1YW50aXR5OiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgY2xlYXJDYXJ0OiAoKSA9PiB2b2lkO1xyXG4gIHRvdGFsSXRlbXM6IG51bWJlcjtcclxuICB0b3RhbFByaWNlOiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IENhcnRDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxDYXJ0Q29udGV4dFR5cGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XHJcblxyXG5leHBvcnQgY29uc3QgQ2FydFByb3ZpZGVyOiBSZWFjdC5GQzx7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfT4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgY29uc3QgW2NhcnRJdGVtcywgc2V0Q2FydEl0ZW1zXSA9IHVzZVN0YXRlPENhcnRJdGVtW10+KFtdKTtcclxuXHJcbiAgY29uc3QgYWRkVG9DYXJ0ID0gKHByb2R1Y3Q6IFByb2R1Y3QsIHF1YW50aXR5OiBudW1iZXIsIHNpemU6IHN0cmluZywgY29sb3I6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgZXhpc3RpbmdJdGVtID0gY2FydEl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBwcm9kdWN0LmlkKTtcclxuICAgIGlmIChleGlzdGluZ0l0ZW0pIHtcclxuICAgICAgc2V0Q2FydEl0ZW1zKHByZXZJdGVtcyA9PiBcclxuICAgICAgICBwcmV2SXRlbXMubWFwKGl0ZW0gPT4gXHJcbiAgICAgICAgICBpdGVtLmlkID09PSBwcm9kdWN0LmlkIFxyXG4gICAgICAgICAgICA/IHsgLi4uaXRlbSwgcXVhbnRpdHk6IGl0ZW0ucXVhbnRpdHkgKyBxdWFudGl0eSB9XHJcbiAgICAgICAgICAgIDogaXRlbVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNhcnRJdGVtOiBDYXJ0SXRlbSA9IHtcclxuICAgICAgICBpZDogcHJvZHVjdC5pZCxcclxuICAgICAgICBuYW1lOiBwcm9kdWN0Lm5hbWUsXHJcbiAgICAgICAgcHJpY2U6IHByb2R1Y3QucHJpY2UsXHJcbiAgICAgICAgaW1hZ2VVcmw6IHByb2R1Y3QuaW1hZ2VVcmwsXHJcbiAgICAgICAgY2F0ZWdvcnk6IHByb2R1Y3QuY2F0ZWdvcnksXHJcbiAgICAgICAgcXVhbnRpdHksXHJcbiAgICAgICAgc2VsZWN0ZWRTaXplOiBzaXplLFxyXG4gICAgICAgIHNlbGVjdGVkQ29sb3I6IGNvbG9yXHJcbiAgICAgIH07XHJcbiAgICAgIHNldENhcnRJdGVtcyhwcmV2SXRlbXMgPT4gWy4uLnByZXZJdGVtcywgY2FydEl0ZW1dKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCByZW1vdmVGcm9tQ2FydCA9IChwcm9kdWN0SWQ6IHN0cmluZykgPT4ge1xyXG4gICAgc2V0Q2FydEl0ZW1zKHByZXZJdGVtcyA9PiBwcmV2SXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPT0gcHJvZHVjdElkKSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdXBkYXRlUXVhbnRpdHkgPSAocHJvZHVjdElkOiBzdHJpbmcsIHF1YW50aXR5OiBudW1iZXIpID0+IHtcclxuICAgIHNldENhcnRJdGVtcyhwcmV2SXRlbXMgPT4gXHJcbiAgICAgIHByZXZJdGVtcy5tYXAoaXRlbSA9PiBcclxuICAgICAgICBpdGVtLmlkID09PSBwcm9kdWN0SWQgXHJcbiAgICAgICAgICA/IHsgLi4uaXRlbSwgcXVhbnRpdHkgfVxyXG4gICAgICAgICAgOiBpdGVtXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2xlYXJDYXJ0ID0gKCkgPT4ge1xyXG4gICAgc2V0Q2FydEl0ZW1zKFtdKTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0b3RhbEl0ZW1zID0gY2FydEl0ZW1zLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiBzdW0gKyBpdGVtLnF1YW50aXR5LCAwKTtcclxuICBjb25zdCB0b3RhbFByaWNlID0gY2FydEl0ZW1zLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiBzdW0gKyAoaXRlbS5wcmljZSAqIGl0ZW0ucXVhbnRpdHkpLCAwKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxDYXJ0Q29udGV4dC5Qcm92aWRlciBcclxuICAgICAgdmFsdWU9e3sgXHJcbiAgICAgICAgY2FydEl0ZW1zLCBcclxuICAgICAgICBhZGRUb0NhcnQsIFxyXG4gICAgICAgIHJlbW92ZUZyb21DYXJ0LCBcclxuICAgICAgICB1cGRhdGVRdWFudGl0eSwgXHJcbiAgICAgICAgY2xlYXJDYXJ0LFxyXG4gICAgICAgIHRvdGFsSXRlbXMsXHJcbiAgICAgICAgdG90YWxQcmljZSBcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9DYXJ0Q29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUNhcnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQ2FydENvbnRleHQpO1xyXG4gIGlmIChjb250ZXh0ID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigndXNlQ2FydCBtdXN0IGJlIHVzZWQgd2l0aGluIGEgQ2FydFByb3ZpZGVyJyk7XHJcbiAgfVxyXG4gIHJldHVybiBjb250ZXh0O1xyXG59O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwiQ2FydENvbnRleHQiLCJ1bmRlZmluZWQiLCJDYXJ0UHJvdmlkZXIiLCJjaGlsZHJlbiIsImNhcnRJdGVtcyIsInNldENhcnRJdGVtcyIsImFkZFRvQ2FydCIsInByb2R1Y3QiLCJxdWFudGl0eSIsInNpemUiLCJjb2xvciIsImV4aXN0aW5nSXRlbSIsImZpbmQiLCJpdGVtIiwiaWQiLCJwcmV2SXRlbXMiLCJtYXAiLCJjYXJ0SXRlbSIsIm5hbWUiLCJwcmljZSIsImltYWdlVXJsIiwiY2F0ZWdvcnkiLCJzZWxlY3RlZFNpemUiLCJzZWxlY3RlZENvbG9yIiwicmVtb3ZlRnJvbUNhcnQiLCJwcm9kdWN0SWQiLCJmaWx0ZXIiLCJ1cGRhdGVRdWFudGl0eSIsImNsZWFyQ2FydCIsInRvdGFsSXRlbXMiLCJyZWR1Y2UiLCJzdW0iLCJ0b3RhbFByaWNlIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUNhcnQiLCJjb250ZXh0IiwiRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./contexts/CartContext.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _contexts_CartContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/CartContext */ \"(pages-dir-node)/./contexts/CartContext.tsx\");\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_2__.SessionProvider, {\n        session: pageProps.session,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_CartContext__WEBPACK_IMPORTED_MODULE_3__.CartProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Administrator\\\\Desktop\\\\Lustra\\\\Frontend\\\\lustra\\\\pages\\\\_app.tsx\",\n                lineNumber: 10,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Administrator\\\\Desktop\\\\Lustra\\\\Frontend\\\\lustra\\\\pages\\\\_app.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Administrator\\\\Desktop\\\\Lustra\\\\Frontend\\\\lustra\\\\pages\\\\_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUErQjtBQUNtQjtBQUVLO0FBRXZELFNBQVNFLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDL0MscUJBQ0UsOERBQUNKLDREQUFlQTtRQUFDSyxTQUFTRCxVQUFVQyxPQUFPO2tCQUN6Qyw0RUFBQ0osK0RBQVlBO3NCQUNYLDRFQUFDRTtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7O0FBSWhDO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQWRtaW5pc3RyYXRvclxcRGVza3RvcFxcTHVzdHJhXFxGcm9udGVuZFxcbHVzdHJhXFxwYWdlc1xcX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xuaW1wb3J0IHsgU2Vzc2lvblByb3ZpZGVyIH0gZnJvbSAnbmV4dC1hdXRoL3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgeyBDYXJ0UHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9DYXJ0Q29udGV4dCc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8U2Vzc2lvblByb3ZpZGVyIHNlc3Npb249e3BhZ2VQcm9wcy5zZXNzaW9ufT5cbiAgICAgIDxDYXJ0UHJvdmlkZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvQ2FydFByb3ZpZGVyPlxuICAgIDwvU2Vzc2lvblByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDsiXSwibmFtZXMiOlsiU2Vzc2lvblByb3ZpZGVyIiwiQ2FydFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJzZXNzaW9uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();