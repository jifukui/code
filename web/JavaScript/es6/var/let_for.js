let i = 7;
for (let i = 0; i < 7; i++) {
    let i = 6;
    console.log(i)
}
function display(x = y, y = 2) {
    console.log(x, y)
}
display();
/**
 * 这段程序表名for循环的内部和外部的以及定义的位置中的参数
 * 在不同的临时性死区
 */