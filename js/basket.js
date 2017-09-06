/**
 * Created by Alpo4 on 06.09.2017.
 */
$(function() {


    var sum=0;
    var count=0;

    function writePage() {
        sum=0;
        count=0;
        var basket=$.cookie('cart');
        basket = eval(basket);

        $('.table tr').remove();
        $('.txt_full_cost, .text_lvl_2').remove();

        $('.table').append(' <tr>'+
                                '<th>#</th>'+
                                '<th>Img</th>'+
                                '<th>Name</th>'+
                                '<th>Cost, €</th>'+
                                '<th>Number</th>'+
                                '<th>Delete</th>'+
                            '</tr>');
        for(var i=0; i<basket.length; i++){
            sum = sum + parseFloat(basket[i].cost)*parseInt(basket[i].quantity);
            count = count + parseInt(basket[i].quantity);
            $('.table').append(' <tr>'+
                                    '<td>'+(i+1)+'</td>'+
                                    '<td><img src="'+basket[i].img+'"></td>'+
                                    '<td>'+basket[i].name+'</td>'+
                                    '<td>'+basket[i].cost+'</td>'+
                                    '<td><input type="number" id="0'+basket[i].id+'" class="cout_prod" value="'+parseInt(basket[i].quantity)+'" min="1" max="5"></td>'+
                                    '<td><span id="'+basket[i].id+'" class="glyphicon glyphicon-remove-sign del-bask"></span></td>'+
                                '</tr>');
        }
        goCheck();
        $('body').append('<span class="text_lvl_2">Progducts <span class="txt_full_cost">'+count+'</span> for the amount of  </span><span class="txt_full_cost">€'+sum+'</span>');


    }

    writePage();
    
    function goCheck() {
        $('.del-bask').bind('click', function () {
            delProduct(this.id);

        });
        $('.cout_prod').bind('click', function () {
            var str = this.id;
            addQuantity(this.value, str[1]);

        });
        $('#close').bind('click', function () {
            console.log(this.id);
            window.location.href = '/';
        });
        $('#buy').bind('click', function () {
            console.log(this.id);
           // window.location.href = 'index.html';
            var basket=$.cookie('cart');
            // basket = eval(basket);
            $.ajax({
                url: 'install/index.php',
                type: 'post',
                dataType: 'JSON',
                data: {basket: basket},
                success: function(data){
                    deleteCookie('cart');
                },
            });
        });
    }

    function deleteCookie(name) {
        $.cookie(name, null, {expires: -1});
        window.location.href = '/';
    }

    function delProduct(id) {
        console.log("++++")
        var basket=$.cookie('cart');
        basket = eval(basket);
        for (var i=0;i<basket.length;i++){
            if(basket[i].id==id){

                basket.splice(i, 1);

                basket=JSON.stringify(basket);//конвертирование в строку
                $.cookie('cart',basket );//запись в куки*/
                writePage();
                break;
            }
        }

    }
    function addQuantity(val, id) {

        var basket=$.cookie('cart');
        var cart = eval(basket);
        sum=0;
        count=0;
        for(var i=0;i<cart.length;i++){
            if (cart[i].id==id){
                cart[i].quantity=val;
                break;
            }
        }
        for(var i=0;i<cart.length;i++){
            sum = sum + parseFloat(cart[i].cost)*parseInt(cart[i].quantity);
            count = count + parseInt(cart[i].quantity);
        }

        $('.txt_full_cost, .text_lvl_2').remove();
        $('body').append('<span class="text_lvl_2">Progducts <span class="txt_full_cost">'+count+'</span> for the amount of  </span><span class="txt_full_cost">€'+sum+'</span>');
        cart=JSON.stringify(cart);//конвертирование в строку
        $.cookie('cart',cart );//запись в куки*/

    }

});
