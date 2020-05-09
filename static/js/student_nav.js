menu = function(){
  this.init = function(){
      this.university_list = [];
      this.department_list = [];
      this.subject_list = [];
      this.lector_list = [];
      this.university_selected = 0;
      this.department_selected = 0;
      this.subject_selected = 0;
      this.lector_selected = 0;
      this.get_university_list();
//      console.log(this.university_list);
  };

  this.get_university_list = function(){
      var self = this;
      $.ajax({
          url:'/ajax/get_university_list/', type:'GET', async: false, dataType:'json',
          success: function(result){
              self.university_list = result
         }
      });
  };

  this.render_university_list = function(){
      $('#university_list').html('');
      this.university_list.forEach(function(e,i){
          $('#university_list').append('<li><a href="#" data-name="'+ e.name+'" data-university_id="'+ e.id+'">'+ e.full_name+'</a></li>')
      });
      this.bind_click_university_item();
  };

  this.bind_click_university_item = function(){
      var self = this;
      $('#university_list li a').on('click', function(e){
          e.preventDefault();
          $('#university_list li a').removeClass('selected');
          $(this).addClass('selected');
          var name = $(this).attr('data-name');
          $('#university_list').siblings('.dropdown-toggle').find('strong').text(name);
          self.get_department_list($(this).attr('data-university_id'));
      });
  };

  this.get_department_list = function(university_id){
      var self = this;
      $.ajax({
          url:'/ajax/get_department_list/', data:{'university_id':university_id}, type:'GET', async: false, dataType:'json',
          success: function(result){
              self.department_list = result;
              self.render_department_list();
         }
      });
  };

  this.render_department_list = function(){
      $('#department_list').html('');
      this.department_list.forEach(function(e,i){
          $('#department_list').append('<li><a href="#" data-name="'+ e.name+'" data-department_id="'+ e.id+'" data-university_id="'+ e.university_id+'">'+ e.full_name+'</a></li>')
      });
      this.bind_click_department_item();
  };

  this.bind_click_department_item = function(){
      var self = this;
      $('#department_list li a').on('click', function(e){
          e.preventDefault();
          $('#department_list li a').removeClass('selected');
          $(this).addClass('selected');
          var name = $(this).attr('data-name');
          $('#department_list').siblings('.dropdown-toggle').find('strong').text(name);
          self.get_subject_list($(this).attr('data-department_id'));
      });
  };

  this.get_subject_list = function(department_id){
      var self = this;
      $.ajax({
          url:'/ajax/get_subject_list/', data:{'department_id':department_id}, type:'GET', async: false, dataType:'json',
          success: function(result){
              self.subject_list = result;
              self.render_subject_list();
         }
      });
  };

  this.render_subject_list = function(){
      $('#subject_list').html('');
      this.subject_list.forEach(function(e,i){
          $('#subject_list').append('<li><a href="#" data-name="'+ e.name+'" data-department_id="'+ e.department_id+'" data-subject_id="'+ e.id+'">'+ e.full_name+'</a></li>')
      });
      this.bind_click_subject_item();
  };

  this.bind_click_subject_item = function(){
      var self = this;
      $('#subject_list li a').on('click', function(e){
          e.preventDefault();
          $('#subject_list li a').removeClass('selected');
          $(this).addClass('selected');
          var name = $(this).attr('data-name');
          $('#subject_list').siblings('.dropdown-toggle').find('strong').text(name);
          self.get_lectors_list($(this).attr('data-subject_id'));
      });
  };

  this.get_lectors_list = function(subject_id){
      var self = this;
//      console.log('data-subject_id: ', subject_id);
      $.ajax({
          url:'/ajax/get_lector_list/', data:{'subject_id':subject_id}, type:'GET', async: false, dataType:'json',
          success: function(result){
              self.lector_list = result;
              self.render_lectors_list();
         }
      });
  };

  this.render_lectors_list = function(){
//      console.log('render_lector_list');
      $('#lector_list').html('');
      this.lector_list.forEach(function(e,i){
          $('#lector_list').append('<li><a href="#" data-name="'+ e.name+'" data-lector_id="'+ e.id+'">'+ e.full_name+'</a></li>')
      });
      this.bind_click_lector_list();
  };

  this.bind_click_lector_list = function(){
      var self = this;
      $('#lector_list li a').on('click', function(e){
          e.preventDefault();
          $('#lector_list li a').removeClass('selected');
          $(this).addClass('selected');
          var name = $(this).attr('data-name');
          $('#lector_list').siblings('.dropdown-toggle').find('strong').text(name);
//          self.get_lectors_list($(this).attr('data-subject_id'));
      });
  };

  this.init();
};


$(function(){
   $('.navbar-white .navbar-left a').on('click', function(){
       $('.navbar-white .navbar-left li').removeClass('active');
       $(this).parent().addClass('active');
       $('.navbar-gray').removeClass('active').addClass('active');
       nav = new menu();
       nav.render_university_list();
   });
});