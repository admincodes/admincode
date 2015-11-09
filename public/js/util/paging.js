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
            if(this.lastPage >= 5){ // 5���������� �����ش�..
                for(var i = 0; i<5; i++){
                    data.paging[i] = {};
                    data.paging[i].number = i+1;
                }

                data.showLast = true;
            }
            else{ // ������������ 5���������� ����
                for(var i = 0; i<this.lastPage; i++){
                    data.paging[i] = {};
                    data.paging[i].number =  i+1;
                }
            }
        }else{ // 5�������� ū ���   �տ� 2������ �ڿ� �������� �̷�������..
            if(this.lastPage - this.currentPage < 5){ // ���������� 5��°������ �����ش�.
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