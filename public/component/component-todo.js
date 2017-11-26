Vue.component("todo-list",{
  props:["todos"],
  template:`
  <ul class="todo-list">
    <li v-for="(todo,index) in todos">
      <div class="todo-title" @click="expand(todo._id)">
        <span>{{todo.title}}</span>
        <div class="arrow-icon glyphicon glyphicon-chevron-left"></div>
      </div>
      <div class="todo-detail row" :id="todo._id">
        <span class="input-label">Title</span>
        <input type="text" :value="todo.title" placeholder="Type your todo title" class="input-title">
        <span class="input-label">Description</span>
        <textarea placeholder="Type your todo description" class="input-desc">{{todo.desc}}</textarea>
        <div class="col-sm-4">
          <span class="input-label">Location</span>
          <input type="text" :value="todo.location" placeholder="Type your todo location" class="input-loc"/>
        </div>
        <div class="col-sm-4">
          <span class="input-label">Status</span>
          <select class="input-status" v-if="todo.status">
            <option value="true">Finished</option>
            <option value="false">Unfinished</option>
          </select>
          <select class="input-status" v-else>
            <option value="false">Unfinished</option>
            <option value="true">Finished</option>
          </select>
        </div>
        <div class="col-sm-4">
          <span class="input-label">Date</span>
          <input type="date" class="input-date" :value="todo.date"/>
        </div>
        <button @click="sendData(todo._id)" class="btn btn-primary col-xs-12 col-sm-2">Update</button>
        <button @click="deleteTodo(todo._id)" class="btn btn-danger col-xs-12 col-sm-2">Delete</button>
      </div>
    </li>
  </ul>`,
  methods:{
    sendData:function(targetId){
      var getElement=$("#"+targetId);
      var sendData={
        todoId:targetId,
        title:getElement.find(".input-title").val(),
        desc:getElement.find(".input-desc").val(),
        location:getElement.find(".input-loc").val(),
        status:getElement.find(".input-status").val(),
        date:getElement.find(".input-date").val()
      }
      this.$emit("tododata",sendData);
    },
    deleteTodo:function(targetId){
      this.$emit("deletedata",targetId);
    },
    expand:function(targetId){
      // Reset all
      $("div.todo-title").removeAttr("style");
      $("div.todo-detail").slideUp(500);
      // Expand selected
      $("#"+targetId).prev("div.todo-title").css("backgroundColor","#FFF");
      $("#"+targetId).slideDown(500);
    }
  }
});

// Create Todo Component
Vue.component("create-todo",{
  template:`
  <div class="create-todo row" id="create-todo">
    <span class="input-label">Title</span>
    <input type="text" v-model="inputTitle" placeholder="Type your todo title"/>
    <span class="input-label">Description</span>
    <textarea v-model="inputDescription" placeholder="Type your todo description"></textarea>
    <div class="col-sm-4">
      <span class="input-label">Location</span>
      <input type="text" v-model="inputLocation" placeholder="Type your todo location"/>
    </div>
    <div class="col-sm-4">
      <span class="input-label">Status</span>
      <select v-model="inputStatus">
        <option value="true">Finished</option>
        <option value="false">Unfinished</option>
      </select>
    </div>
    <div class="col-sm-4">
      <span class="input-label">Date</span>
      <input type="date" v-model="inputDate"/>
    </div>
    <button @click="createTodo" class="btn btn-primary col-xs-12 col-sm-2">Create</button>
  </div>`,
  data:function(){
    return{
      inputTitle:null,
      inputDescription:null,
      inputLocation:null,
      inputStatus:"true",
      inputDate:null
    }
  },
  methods:{
    createTodo:function(){
      var getElement=$("#create-todo");
      var createData={
        title:this.inputTitle,
        desc:this.inputDescription,
        location:this.inputLocation,
        status:this.inputStatus,
        date:this.inputDate
      }
      this.$emit("createtodo",createData);
      this.inputTitle=null;
      this.inputDescription=null;
      this.inputLocation=null;
    }
  }
});
