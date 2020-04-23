function make_slider(slider_ID, output_ID, min_value, max_value) {
    var slider = document.getElementById(slider_ID);
    var output = document.getElementById(output_ID);
    var range = (max_value - min_value);
    output.innerHTML = (min_value + slider.value * range / 1000.0).toFixed(3);

    slider.oninput = function () {
        output.innerHTML = (min_value + this.value * range / 1000.0).toFixed(3);
        makeChart();
    }
}
