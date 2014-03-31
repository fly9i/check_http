var page = require('webpage').create();
page.viewportSize = { width: 800, height: 480 };
page.open('http://www.agrant.cn/', function (status) {
    if (status !== 'success') {
        console.log('Unable to access the network!');
    } else {
        page.evaluate(function () {
            //body.querySelector("#main-navbar-about").css
            $("#main-navbar-about").css("border","5px red solid");
            /*
            var bt=document.getElementById
            var body = document.body;
            body.style.backgroundColor = '#fff';
            body.querySelector('div#title-block').style.display = 'none';
            body.querySelector('form#edition-picker-form').parentElement.parentElement.style.display = 'none';
            */
        });
        page.render('test.png');
    }
    phantom.exit();
});