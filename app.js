var g_start=null,
g_speed=null,
g_area=null,
g_areacontext=null,
g_areawidth=0,
g_areaheight=0,
cell_width=0,
g_playscore=0,
snake=null,
snake_food=null,
snake_direction=null,
speed_size=0,
timer=null;

function initializing(){
    g_start=document.querySelector("#g_start");
    g_speed=document.querySelector("#g_speed");
    g_area=document.querySelector("#g_area");
    g_areacontext=g_area.getContext("2d");
    g_areawidth=400;
    g_areaheight=500;
    cell_width=20;
    g_area.width=g_areawidth;
    g_area.height=g_areaheight;

    g_start.onclick=function(){
        this.disabled=true;
        start_game();
    };
}

function start_game(){
    g_playscore=0;
    snake_direction="right";
    speed_size=parseInt(g_speed.value);

    if(speed_size>9){
       speed_size=9;
    }
    else if(speed_size<0){
        speed_size=1;
    }

    snake=[];
    snake.push({ x:0, y:cell_width});

    create_food();
    clearInterval(timer);
    timer=setInterval(create_game_area,500/speed_size)
}

function create_food(){
    snake_food={
        x:Math.round((Math.random() * (g_areawidth - cell_width))/cell_width),
        y:Math.round((Math.random() * (g_areaheight - cell_width))/cell_width)
    };
}

function create_game_area(){
    var snake_x=snake[0].x;
    var snake_y=snake[0].y;

    g_areacontext.fillStyle="#FFFFFF";
    g_areacontext.fillRect(0,0,g_areawidth,g_areaheight);
    g_areacontext.strokeStyle="#CCCCCC";
    g_areacontext.strokeRect(0,0,g_areawidth,g_areaheight);

    if(snake_direction=='right'){
        snake_x++;
    }
    else if(snake_direction=='left'){
        snake_x--;
    }
    else if(snake_direction=='down'){
        snake_y++;
    }
    else if(snake_direction=='up'){
        snake_y--;
    }

    if(snake_x==-1 || snake_x==g_areawidth/cell_width || snake_y==-1 || snake_y==g_areaheight/cell_width || control(snake_x,snake_y,snake)){
        write_score();
        clearInterval(timer);
        g_start.disabled=false;
        return;
    }

    if(snake_x==snake_food.x && snake_y==snake_food.y){
        var new_head={ x:snake_x, y:snake_y};
        g_playscore+=speed_size;
        create_food()
    }
    else{
        var new_head=snake.pop();
        new_head.x=snake_x;
        new_head.y=snake_y;
    }
    snake.unshift(new_head);
    for(var i=0;i<snake.length;i++){
        create_square(snake[i].x,snake[i].y);
    }

    create_square(snake_food.x,snake_food.y);
}

function control(x,y,array){
    for(var i=0;i<array.length;i++){
        if(array[i].x == x && array[i].y == y) return true;
    }
    return false;

}

function write_score(){
    g_areacontext.font="40px Poppins";
    g_areacontext.fillStyle="#ff0000";
    g_areacontext.fillText(
        "SCORE : "+g_playscore,
        g_areawidth/2-100,
        g_areaheight/2
    )
}

function create_square(x,y){
    g_areacontext.fillStyle="#000000";
    g_areacontext.fillRect(x*cell_width,y*cell_width,cell_width,cell_width)

}

function change_direction(e) {
    var keys = e.which || e.keyCode;
    if (keys === 40 && snake_direction !== "up") {
        snake_direction = "down";
    } else if (keys === 39 && snake_direction !== "left") {
        snake_direction = "right";
    } else if (keys === 38 && snake_direction !== "down") {
        snake_direction = "up";
    } else if (keys === 37 && snake_direction !== "right") {
        snake_direction = "left";
    }
}

window.onkeydown = change_direction;


window.onload=initializing;