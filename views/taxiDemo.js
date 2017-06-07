$(function () {

    $.getJSON("http://localhost:5000/taxis", function (data) {
        $.each(data.normal, function (index, elem) {
            $('#taxiList-normal').append('<li class="list-group-item">'+'Taxi '+ elem.id+' at '+elem.x+' , '+elem.y+'</li>');
        });
        $.each(data.pink, function (index,elem) {
            $('#taxiList-pink').append('<li class="list-group-item">'+'Taxi '+ elem.id+' at '+elem.x+' , '+elem.y+'</li>');
        });

    });
});