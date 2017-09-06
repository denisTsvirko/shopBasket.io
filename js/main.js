/**
 * Created by Alpo4 on 05.09.2017.
 */


$(function() {
    var allProducts=null;
    $.ajax({
        url: 'install/index.php',
        type: 'post',
        dataType: 'JSON',
        data: {all:'all'},
        success: function(data){
            writeProducts(data);
        },
    });
    var countProd = 0;
    var ct=$.cookie('cart'); // получаем сохраненные ранее настройки
    if(ct!=null) {
        ct = eval(ct);
        countProd = ct.length;
        writeCountProd(countProd);
    }
    function writeCountProd(countProd) {
        $('#countProd').text('('+countProd+')');
        $('.head_txt').text('Showing '+countProd+' of '+countProd+' items added');
    }

    function writeProducts(products) {
        allProducts = products;

        for(var i=0;i<products.length;i++){
        $('.main_products').append('<div class="cont_product">'+
                                        '<img src="'+products[i].img+'">'+
                                        '<div class="elem_left">'+
                                            '<span class="text_lvl_1">'+products[i].name+'</span>'+
                                            '<span class="text_lvl_1">'+products[i].info+'</span>'+
                                            '<span class="text_lvl_2">Status:<span class="text_lvl_2_red"> '+products[i].status+'</span></span>'+
                                            '<span class="text_lvl_2">Quantity:<span class="text_lvl_2_red"> '+products[i].quantity+'</span></span>'+
                                        '</div>'+
                                        '<div class="elem_right">'+
                                            '<span class="text_cost">€ '+products[i].cost+'</span>'+
                                            '<input  type="number" id="prod'+products[i].id+'" class=" cout_prod" value="1" min="1" max="5">'+
                                            '<span class="glyphicon glyphicon-shopping-cart my-cart" id="'+products[i].id+'"></span>'+
                                        '</div>'+
                                    '</div>');
        }

        goCheckAddButt();
    }
    var old_count=0;
    function goCheckAddButt() {
        $('.my-cart').bind('click', function () {
            var concrete_product=null;
            for(var i=0;i<allProducts.length;i++){
                if(allProducts[i].id==this.id){
                    concrete_product=allProducts[i];
                    break;
                }
            }

            var dataCart=$.cookie('cart'); // получаем сохраненные ранее настройки
            var $this = $(this);
            var $quantity = $this.prevAll("[id='" + ("prod"+this.id) + "']").first();

            if(dataCart!=null) {

                if(checkCookies(dataCart,concrete_product)){
                    dangerFlash();
                }else{
                    addCookies(dataCart, $quantity, concrete_product );
                    countProd++;
                    successFlash('Product successfully added to your cart.');
                    writeCountProd(countProd);
                    writeBasket();
                    old_count=1;
                }

            }else{
                addCookies(dataCart, $quantity, concrete_product );
                countProd++;
                successFlash('Product successfully added to your cart.');
                writeCountProd(countProd);
                writeBasket();
                old_count=1;
            }
        });
    }
    
    function addCookies(dataCart, kol, product) {

        if(dataCart!=null) {
            var cart = eval(dataCart);
        }else{
            var cart=[];
        }
        cart.push({
            'id': product.id,
            'name': product.name,
            'img': product.img,
            'info': product.info,
            'status': product.status,
            'quantity': kol.val(),
            'cost': product.cost,
        });
        cart=JSON.stringify(cart);//конвертирование в строку
        $.cookie('cart',cart );//запись в куки*/
    }
    function checkCookies(dataCart, product) {
        var cart = eval(dataCart);
        for(var i=0;i<cart.length;i++){
            if(cart[i].id==product.id){
                return true;
            }
        }
        return false;
    }
    
    function dangerFlash() {
        if($('.alert').length<=0) {
            $('body').append('<div class="alert alert-danger alert-dismissible success-block" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<strong>Danger!</strong> Product in your shopping cart!.' +
                '</div>');
            delFlash(1500);
        }
    }
    function successFlash(text) {
        if($('.alert').length<=0) {
            $('body').append('<div class="alert alert-success alert-dismissible success-block" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<strong>Well done!</strong> '+text +
                '</div>');
            delFlash(1500);
        }
    }
    function delFlash(time) {
        setTimeout(function(){
            $('.alert').remove();
        }, time);
    }


    var count_click = 0;

    $('#show_cart').bind('click', function () {
        if(count_click==0){
            $('.main_basket').css('display','flex');
            if(old_count!=1) {
                writeBasket();
                old_count=countProd;
            }
            count_click=1;
        }else{
            $('.main_basket').css('display','none');
            count_click=0;
        }
    });

    function writeBasket() {
        if(countProd!=0){
            $('h3, .block_item, .full_cost, .menu_but').remove();
            var basket=$.cookie('cart');
            basket = eval(basket);

            var sum=0;
            for(var i=0;i<basket.length;i++){
                sum=sum+(parseFloat(basket[i].cost)*parseInt(basket[i].quantity));
                $('.main_basket').append('<div class="block_item">'+
                                            '<div class=" con">'+
                                                '<img src="'+basket[i].img+'">'+
                                                '<div class="elem_left">'+
                                                    '<span class="text_lvl_1">'+basket[i].name+'</span>'+
                                                    '<span class="text_lvl_1">'+basket[i].info+'</span>'+
                                                    '<span class="text_lvl_2">Status:<span class="text_lvl_2_red"> '+basket[i].status+'</span></span>'+
                                                    '<span class="text_lvl_2">Quantity:<span class="text_lvl_2_red"> '+basket[i].quantity+'</span></span>'+
                                                '</div>'+
                                                '<div class="elem_right">'+
                                                    '<span class="text_cost">€ '+basket[i].cost+'</span>'+
                                                    '<span id="0'+basket[i].id+'" class="glyphicon glyphicon-remove-sign del-bask"></span>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="line_hor"></div>'+
                                            '</div>');


            }
            $('.main_basket').append('<div class="full_cost">'+
                                            '<div class="text_lvl_2">Total including tax</div><div class="txt_full_cost">€ '+sum+'</div>'+
                                    '</div>');
            $('.main_basket').append('<div class="menu_but">'+
                                        '<button class="btn btn-primary" id="basket">View Cart</button>'+
                                        '<button class="btn  btn-default-my" id="buy" style="margin-left: 5px;">Continue to Checkout</button>'+
                                    '</div>');
            goCheckBasketButt();
        }else{
            $('h3, .block_item, .full_cost, .menu_but').remove();
            $('.main_basket').append('<h3>The basket is empty!</h3>');
        }
    }

    function goCheckBasketButt(){
        $('.del-bask').bind('click', function () {
            console.log(this.id);
            var str = this.id;
            delProduct(str[1]);
        });

        $('#basket').bind('click', function () {
            console.log(this.id);
            window.location.href = 'cart.html';
        });

        $('#buy').bind('click', function () {
            console.log(this.id);
            //deleteCookie('cart');
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

    function delProduct(id) {
        console.log("++++")
        var basket=$.cookie('cart');
        basket = eval(basket);
        for (var i=0;i<basket.length;i++){
            if(basket[i].id==id){
                countProd--;
                basket.splice(i, 1);

                basket=JSON.stringify(basket);//конвертирование в строку
                $.cookie('cart',basket );//запись в куки*/

                writeCountProd(countProd);
                writeBasket();

                break;
            }
        }

    }

    function deleteCookie(name) {
            $.cookie(name, null, {expires: -1});
            countProd = 0;
            successFlash('Success buy!');
            writeCountProd(countProd);
            writeBasket();
            old_count = 0;
    }


});