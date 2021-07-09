function data() {
    console.log("I am is data")
}
data();
(function () {
    // data()
    console.log(data)
    if (false) {
        data();
        function data() {
            console.log("i am is data1")
        }
    }
    data();

}())