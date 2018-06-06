var hello = require('./module_hello_one');
hello.world();

var Hello = require('./module_hello_two');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();