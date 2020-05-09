
EducationTestForm = function(university, department, subject){
  this.init = function(university, department, subject){
//      console.log('university: ', university, 'department: ', department, 'subject: ', subject);
      this.university = $('#id_university').val('');
      this.clear_department_list();
      var self = this;
      $('#id_university').on('change', function(){
         if ($(this).val()) {
             self.get_department_list($(this).val());
         } else {
             self.clear_department_list();
         }
      });

      if (university && department && subject) {
          $('#id_university').val(university).change();
          $('#id_department').val(department).change();
          $('#id_subject').val(subject).change();
      }

      $('#add_education_test').on('submit', function(e){
          var data = {
              'university': $('#id_university').val(),
              'department': $('#id_department').val(),
              'subject': $('#id_subject').val(),
              'name': $('#id_name').val(),
              'description': $('#id_description').val(),
              'level_up': $('#id_level_up').val(),
              'level_down': $('#id_level_down').val(),
              'fail': $('#id_fail').val(),
              'not_fail': $('#id_not_fail').val(),
              'good': $('#id_good').val()
          };
          if (!self.validate(data)) {
               e.preventDefault();
               return false;
          }
      });
  };


  this.validate = function(data){
      var errors = 0;
      if (!data['university'] || data['university'] == 0) {
          errors += 1;
          $('#id_university').parents('.form-group').addClass('has-error').children('.help-block').text('Выберите университет');
      } else {
          $('#id_university').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }
      if (!data['department'] || data['department'] == 0) {
          errors += 1;
          $('#id_department').parents('.form-group').addClass('has-error').children('.help-block').text('Выберите кафедру');
      } else {
          $('#id_department').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }
      if (!data['subject'] || data['subject'] == 0) {
          errors += 1;
          $('#id_subject').parents('.form-group').addClass('has-error').children('.help-block').text('Выберите дисциплину');
      } else {
          $('#id_subject').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }
      if (!data['name'] || data['name'].length == 0) {
          errors += 1;
          $('#id_name').parents('.form-group').addClass('has-error').children('.help-block').text('Укажите название');
      } else {
          $('#id_name').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }

      var intRegex = /^\d+$/;

      if (!data['level_up'] || data['level_up'].length == 0 || !intRegex.test(data['level_up'])) {
          errors += 1;
          $('#id_level_up').parents('.form-group').addClass('has-error').children('.help-block').text('Обязательное поле. Укажите целое число');
      } else {
          $('#id_level_up').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }

      if (!data['level_down'] || data['level_down'].length == 0 || !intRegex.test(data['level_down'])) {
          errors += 1;
          $('#id_level_down').parents('.form-group').addClass('has-error').children('.help-block').text('Обязательное поле. Укажите целое число');
      } else {
          $('#id_level_down').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }

      if (!data['fail'] || data['fail'].length == 0 || !isNumeric(data['fail']) || parseFloat(data['fail']) >= 100) {
          errors += 1;
          $('#id_fail').parents('.form-group').addClass('has-error').children('.help-block').text('Обязательное поле. Укажите число 0..100');
      } else {
          $('#id_fail').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }
      if (!data['not_fail'] || data['not_fail'].length == 0 || !isNumeric(data['not_fail']) || parseFloat(data['not_fail']) < parseFloat(data['fail']) || parseFloat(data['not_fail']) >= 100) {
          errors += 1;
//          console.log(parseFloat(data['not_fail']), '<', parseFloat(data['fail']));
          $('#id_not_fail').parents('.form-group').addClass('has-error').children('.help-block').text('Обязательное поле. Укажите число больше предыдущего 0..100');
      } else {
          $('#id_not_fail').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }
      if (!data['good'] || data['good'].length == 0 || !isNumeric(data['good']) || parseFloat(data['good']) < parseFloat(data['not_fail']) || parseFloat(data['good']) >= 100) {
          errors += 1;
          $('#id_good').parents('.form-group').addClass('has-error').children('.help-block').text('Обязательное поле. Укажите число больше предыдущего 0..100');
      } else {
          $('#id_good').parents('.form-group').removeClass('has-error').children('.help-block').text('');
      }



      if (errors) {
          return false
      } else {
          return true
      }
  };

  this.clear_department_list = function(){
      $('#id_department').html('<option value="0">Выберите Кафедру</option>').attr('disabled','');
      this.clear_subject_list();
  };
  this.clear_subject_list = function(){
      $('#id_subject').html('<option value="0">Выберите Дисциплину</option>').attr('disabled','');
  };

  this.get_department_list = function(university_id){
      var self = this;
      this.clear_department_list();
      $.ajax({
          url:'/ajax/get_department_list/', data:{'university_id':university_id}, type:'GET', async: false, dataType:'json',
          success: function(result){
              var options = '';
              result.forEach(function(e,i){
                  options += '<option value="'+ e.id+'">'+ e.full_name+'</option>'
              });
              $('#id_department').append(options).removeAttr('disabled');
//              $('#id_department').selectpicker();
              self.bind_change_department();
         }
      });
  };

  this.bind_change_department = function(){
      var self = this;
      $('#id_department').on('change', function(){
          var department = $(this).val();
//          $('#id_department').children().removeAttr('selected');
         if ($(this).val()) {
             $('#id_department').children('option[value="'+department+'"]').attr('selected','selected');
             self.get_subject_list($(this).val());
         }
      });
  };

  this.get_subject_list = function(department_id){
      var self = this;
      this.clear_subject_list();
      $.ajax({
          url:'/ajax/get_subject_list/', data:{'department_id':department_id}, type:'GET', async: false, dataType:'json',
          success: function(result){
              var options = '';
              result.forEach(function(e,i){
                  options += '<option value="'+ e.id+'">'+ e.full_name+'</option>'
              });
              $('#id_subject').append(options).removeAttr('disabled');
              self.bind_change_subject();
         }
      });
  };

  this.bind_change_subject = function(){
      var self = this;
      $('#id_subject').on('change', function(){
         var subject = $(this).val();
         if ($(this).val()) {
             $('#id_subject').children('option[value="'+subject+'"]').attr('selected','selected');
         }
      });
  };

  this.init(university, department, subject);
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}