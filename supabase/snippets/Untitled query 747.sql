TRUNCATE TABLE topics RESTART IDENTITY CASCADE;

INSERT INTO topics (id, title, description, icon, sort_order, stage) VALUES

-- STAGE 1 — Technical Screening
('html-css', 'HTML & CSS', 'Box model, flexbox, grid, positioning, selectors, pseudo-classes, pseudo-elements', '🎨', 10, 1),
('js-types', 'JS Data Types', 'Primitive vs reference types, typeof, type conversions, NaN, null vs undefined', '📝', 20, 1),
('js-coercion', 'Type Coercion', 'Implicit conversion to boolean/string/number, comparison operators, == vs ===', '⚖️', 30, 1),
('js-control-flow', 'Control Flow', 'Conditionals, ternary operator, loops (for/while/do-while), break/continue', '🔄', 40, 1),
('js-strings-numbers', 'Strings & Numbers', 'String methods, Number methods, Math object, template literals', '🔤', 50, 1),
('oop-basics', 'OOP Basics', 'Classes, objects, encapsulation, inheritance, polymorphism', '🏛️', 60, 1),
('algorithms-basics', 'Algorithms & Sorting', 'Binary search, bubble/selection/insertion sort, Big O complexity', '📊', 70, 1),
('data-structures', 'Data Structures', 'Array, linked list, stack, queue, hash table — структура и применение', '🗂️', 80, 1),
('binary-numbers', 'Binary Numbers', 'Перевод в двоичную систему, битовые операции', '🔢', 90, 1),

-- STAGE 2 — CoreJS Interview #1
('expressions', 'Advanced Expressions', 'let/var/const, hoisting, Temporal Dead Zone, polyfills, Object.is', '💡', 110, 2),
('functions', 'Functions & Scope', 'Arrow vs declaration vs expression, functional scope, nested scopes, params by value/reference', '🔧', 120, 2),
('closures', 'Closures', 'Lexical environment, scope vs context, traversal mechanism, connection between function and its env', '🔒', 130, 2),
('this-keyword', 'this & call/apply/bind', 'Reference type, losing this, call/apply/bind, binding twice', '🎯', 140, 2),
('es6-intermediate', 'ECMAScript Intermediate', 'Spread, rest, destructuring, default params, for..of, template literals', '✨', 150, 2),
('objects-arrays', 'Objects & Arrays', 'Object.keys/values/static methods, property descriptors, array flat/reduce/sort/filter', '📋', 160, 2),
('dom-events', 'DOM & Events', 'DOM types, mouse/keyboard/form events, event phases, propagation, delegation, custom events', '🖱️', 170, 2),
('timers-storage', 'Timers & Web Storage', 'setTimeout/setInterval/clearTimeout, localStorage vs sessionStorage vs cookies', '⏱️', 180, 2),
('date-intl', 'Date & Internationalization', 'Date object, date formatting, Intl.DateTimeFormat, Intl.NumberFormat, locale-aware output', '📅', 185, 2),
('design-principles', 'Design Principles', 'KISS, DRY, YAGNI — понимание и применение в коде', '📐', 190, 2),

-- STAGE 3 — CoreJS Interview #2
('modules', 'Modules', 'AMD, CommonJS, ES6 modules, export/import, dynamic imports, module pattern', '📦', 210, 3),
('functional-patterns', 'Functional Patterns', 'Callbacks, IIFE, callback hell, currying, partial application', '🧩', 220, 3),
('oop-advanced', 'OOP & Classes', 'new keyword, constructor functions, public/private/static, class vs constructor function, super()', '🧬', 230, 3),
('prototypes', 'Prototypal Inheritance', '__proto__, prototype chain, Object.create, instanceof', '🔗', 240, 3),
('advanced-types', 'Advanced Data Types', 'Set/Map, WeakSet/WeakMap, Symbol.iterator, iterable objects', '🗃️', 250, 3),
('errors', 'JavaScript Errors', 'try/catch, custom errors, error handling strategies', '🚨', 260, 3),
('async-advanced', 'Async & Event Loop', 'Promises, async/await, microtasks vs macrotasks, garbage collection basics', '⚙️', 270, 3),
('typescript', 'TypeScript', 'Basic types, enums, interfaces, generics, type guards, utility types, module system', '🟦', 280, 3),
('design-patterns', 'Design Patterns', 'Creational, structural, behavioral patterns, SOLID principles', '🏗️', 290, 3),
('testing', 'Testing', 'Unit/integration/E2E, Test Pyramid, TDD, BDD, performance testing', '🧪', 300, 3),
('network', 'Network & HTTP', 'HTTP vs HTTPS, methods, headers, status codes, REST, Fetch, XMLHTTPRequest, requestAnimationFrame', '🌐', 310, 3),
('security', 'Web Security', 'CORS, XSS, OWASP Top 10, JWT, OAuth, authentication basics', '🔐', 320, 3),
('browser-advanced', 'Browser Advanced', 'location/history API, page lifecycle, reflow/repaint, critical rendering path', '🌍', 330, 3),
('methodologies', 'Dev Methodologies', 'Agile, Scrum, Kanban, Waterfall, project estimation techniques', '📅', 340, 3);