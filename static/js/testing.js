function test(test_id){
    this.test_id = test_id;
    this.modal_selector = '#test_modal';

    this.init = function(){
        var self = this;
        $.ajax({
          url:'/ajax/init_test/', data:{'test_id':this.test_id}, type:'GET', async: false, dataType:'json',
          success: function(result){
              $(self.modal_selector).find('.modal-title').text(result.name);
         }
      });
    };

    this.save_answer = function(question_id, answer_id){
        if (answer_id) {
           var self = this;
            $.ajax({
                url: '/ajax/save_question/', data: {'test_id': this.test_id, 'question_id': question_id, 'answer_id': answer_id}, type: 'GET', async: false, dataType: 'html',
                success: function (result) {

//                    $(self.modal_selector).find('.modal-body').html(result);
                }
            });
        }
    };

    this.get_next_question = function(){
        var self = this;
        $.ajax({
            url: '/ajax/get_next_question/', data: {'test_id': this.test_id}, type: 'GET', async: false, dataType: 'html',
            success: function (result) {
                $(self.modal_selector).find('.modal-body').html(result);
                $('.timer').countdown('destroy');

                if ($('.modal-body .question').hasClass('finish_test')){
                    $('.get_next_question').hide();
                    $('.finish_btn').removeClass('hidden').on('click', function(){
                        location.reload();
                    });
                } else {
                    minutes = parseInt($('.question').attr('data-time'));
                    var now = new Date();
                    var up_to = new Date(now);
                    up_to.setMinutes(now.getMinutes()+minutes);
                    $('.timer').countdown({
                        until: up_to,
                        format: 'M S',
                        expiryText: 'Время вышло',
                        description: 'Время ответа на вопрос'
                        },
                        $.countdown.regionalOptions['ru']
                    );
                }
            }
        });
    };

    this.close_test = function(){
//      console.log('colosing test...');
        $.ajax({url: '/ajax/force_finish_test/', data: {'test_id': this.test_id}, type: 'GET', async: false, dataType: 'html',
            success: function (result) {
                location.reload();
            }
        })
    };

    this.init();
};

$(function(){


    var timer = Object();
    var modal_selector = '#test_modal';
   $('.start_test').on('click', function(e){
       var test_id = $(this).attr('data-test_id');
        $(modal_selector).modal({
            keyboard: false,
            backdrop: true,
            show: false
        });

       current_test = new test(test_id);

        $(modal_selector).on('hide.bs.modal', function(e){
            current_test.close_test();
//            console.log('test closed');
        });
        $(modal_selector).on('show.bs.modal', function(e){
//            console.log('test open');
            current_test.get_next_question();
        });
        $(modal_selector).modal('show');

        $('.get_next_question').on('click', function(){
            answer_id = $('input[name="answer_id"]:checked').val();
            question_id = $('input[name="question_id"]').val();
            if (answer_id != 'undefined' && answer_id) {
                current_test.save_answer(question_id, answer_id);
                current_test.get_next_question();
            } else {
                alert('Выберите ответ!')
            }

        });

   });
});