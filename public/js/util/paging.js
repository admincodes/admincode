/**
 * Created by test1 on 2015-05-30.
 */
var Paging =  {
    currentPage : 1,
    lastPage : 1,
    totalCnt : 0,
    pageSize :10,


    setCurrentPage : function(page){
        this.currentPage = page;
    },

    setTotalCnt : function(cnt){
        this.totalCnt = cnt;
        this.setLastPage();
    },

    setLastPage : function(){
        this.lastPage = Math.floor(this.totalCnt / this.pageSize) ;
        this.lastPage += 1;
    },

    getNextPage : function(){
        if(this.lastPage == this.currentPage){
            return this.lastPage;
        }else{
            return this.currentPage +1;
        }
    },
    getPrevPage : function(){
        if(this.currentPage == 1){
            return 1;
        }else{
            return this.currentPage -1;
        }
    },

    getJsonData : function(){
        var data = {};
        data.paging = [];
        data.showFirst = false;
        data.showLast = false;


        if(this.currentPage <=5){
            if(this.lastPage >= 5){ // 5페이지까지 보여준다..
                for(var i = 0; i<5; i++){
                    data.paging[i] = {};
                    data.paging[i].number = i+1;
                }

                data.showLast = true;
            }
            else{ // 총페이지수가 5페이지보다 적다
                for(var i = 0; i<this.lastPage; i++){
                    data.paging[i] = {};
                    data.paging[i].number =  i+1;
                }
            }
        }else{ // 5펭지보다 큰 경우   앞에 2페이지 뒤에 두페이지 이런식으로..
            if(this.lastPage - this.currentPage < 5){ // 마지막에서 5번째까지는 보여준다.
                var index =0;
                for(var i = 4; i>=0; i--, index++){
                    data.paging[index] = {};
                    data.paging[index].number =  this.lastPage - i;
                }
                data.showFirst = true;
                data.showLast = false;
            }else{
                for(var i = 0; i<5; i++){
                    data.paging[i] = {};
                    data.paging[i].number =  this.currentPage  -2 +i;
                }
                data.showFirst = true;
                data.showLast = true;
            }
        } //

        for(var i=0; i<data.paging.length; i++){
            if(data.paging[i].number ==  this.currentPage){
                data.paging[i].current = true;
                data.paging[i].notcurrent = false;
            }else{
                data.paging[i].current = false;
                data.paging[i].notcurrent = true;
            }
        }
        return data;
    }
}