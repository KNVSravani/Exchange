function OnPageLoad()
{
    var base = document.getElementById('exampleFormControlSelect1');
    var target = document.getElementById('exampleFormControlSelect2');
    
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "https://openexchangerates.org/api/currencies.json",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var obj = JSON.stringify(data);
                var keys = Object.keys(data);
                for (var i = 0; i < keys.length; i++) {
                    base.innerHTML = base.innerHTML +
                        '<option value="' + keys[i] + '">' + keys[i] + '</option>';
                    target.innerHTML = target.innerHTML +
                        '<option value="' + keys[i] + '">' + keys[i] + '</option>';
                }
            }, //End of AJAX Success function

            failure: function (data) {
                alert(data.responseText);
            }, //End of AJAX failure function  
            error: function (data) {
                alert(data.responseText);
            } //End of AJAX error function  

        });
    });      
}




function ConvertCurrency() {
    var basecurrency = document.getElementById('exampleFormControlSelect1').value;
    var targetcurrency = document.getElementById('exampleFormControlSelect2').value;
    var inputamt = document.getElementById('exampleFormControlInput1').value;
    var elementtbl = document.getElementById('tblservices');
    console.log('Base:' + basecurrency + "   ,  target:" + targetcurrency + "   , Amount:" + inputamt);

    $.ajax({
        type: "GET",
        url: "https://api.ratesapi.io/api/latest?base=" + basecurrency,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method:"GET",
        success: function (data) {
            //alert(JSON.stringify(data));
            var response = parseFloat(JSON.stringify(data['rates'][targetcurrency]));
            document.getElementById('convertedAmt').innerHTML ='Final Amount:'+ response * inputamt;
            //console.log(response * inputamt);
            var tbody = document.createElement('tbody');
            for (var i = 10; i <= 100; i+=10) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<td>' + i  + basecurrency + '</td>' +
                    '<td>' + i * response + targetcurrency + '</td>';
                tbody.appendChild(tr);
            }
            elementtbl.appendChild(tbody);
        }, //End of AJAX Success function

        failure: function (data) {
            console.log(data.responseText);
        }, //End of AJAX failure function  
        error: function (data) {
            console.log(data.error);
        } //End of AJAX error function  

    });

}