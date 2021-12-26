class Table {
    clazz = undefined;
    id = undefined;
    drawId = undefined;
    sortField = undefined;
    reverse = true;

    constructor(build) {
        if (build) {
            this.clazz = clazz;
            this.id = id;
            this.paging = paging;
            this.columns = jsonData.columns;
            this.dataSource = jsonData.dataSource;
            this.viewDataSource = jsonData.dataSource;
        }
    }

    static get Builder() {
        class Builder {
            columns = undefined;
            dataSource = undefined;
            viewDataSource = undefined;
            paging = {
                use: false,
                from: 1,
                viewDocument: 10
            };

            setClass(clazz) {
                this.clazz = clazz;
                return this;
            }

            setId(id) {
                this.id = id;
                return this;
            }

            setPaging(viewDocumentCnt) {
                this.paging.use = true;
                this.paging.viewDocument = viewDocumentCnt;
                return this;
            }

            setDataSource(dataSource) {
                if (!dataSource.columns) {
                    console.error("Column is missing.");
                }
                this.columns = dataSource.columns;

                if (!dataSource.dataSource) {
                    console.error("Data is missing.");
                }
                this.dataSource = dataSource.dataSource;
                this.viewDataSource = dataSource.dataSource;
                return this;
            }

            addDataSource(dataSource) {
                this.dataSource = this.dataSource.concat(dataSource);
                this.viewDataSource = this.dataSource;
                return this;
            }

            build(from, drawId) {
                this.draw(from, drawId);
                return this;
            }

            /**
             * 체크박스를 선택한 모든 ID 값을 검색
             */
            checkedData() {
                let data = [];
                let dom = document.getElementById(this.id).getElementsByClassName("checkbox");
                for (let i=0; i<dom.length; i++){
                    if (dom[i].checked){
                        data.push(dom[i].id);
                    }
                }
                return data;
            }

            /**
             * 특정 키워드 검색
             * @param {*} field 검색할 필드
             * @param {*} keyword 검색할 키워드
             */
            search(from, field, keyword) {
                if (!keyword) {
                    this.viewDataSource = this.dataSource;
                } else {
                    this.viewDataSource = this.dataSource.filter( (json) => {
                        let data = json[field].toString();
                        return data.indexOf(keyword) > -1;
                    });
                }

                this.draw(from, this.drawId);
            }

            /**
             * 정렬
             * @param {*} field 정렬할 필드
             */
            sorting(from, field) {
                this.sortField = field;
                this.viewDataSource.sort( (o1, o2) => {
                    if (this.reverse) {
                        // 정배열
                        if (o1[field] < o2[field]) return -1;
                        if (o1[field] > o2[field]) return 1;
                        if (o1[field] === o2[field]) return 0;
                        else return -1;
                    } else {
                        // 역배열
                        if (o1[field] < o2[field]) return 1;
                        if (o1[field] > o2[field]) return -1;
                        if (o1[field] === o2[field]) return 0;
                        else return 1;
                    }
                });
                this.reverse = !this.reverse;
                this.draw(from, this.drawId);
            }

            /**
             * 게시판 paging 처리를 위한 함수
             * @param {*} page 현재 페이지
             * @param {*} pageBlockSize 데이터를 몇 개씩 보여줄 것인지
             * @param {*} pageButtonSize 페이지 버튼을 몇개씩 보여줄 것인지
             */
            drawPaging(page, pageBlockSize, pageButtonSize) {
                let startRowNum = Math.floor((pageBlockSize * (page - 1)));
                let endRowNum = Math.min(startRowNum + pageBlockSize, this.viewDataSource.length);
                if (endRowNum > this.viewDataSource.length) {
                    endRowNum = this.viewDataSource.length;
                }
                if (this.viewDataSource.length < 1) {
                    //$("#countInfo").text("총 0개");
                } else {
                    //$("#countInfo").text("총 " + this.viewDataSource.length + "개 중 " + (startRowNum + 1) + " - " + endRowNum);
                }

                if (pageButtonSize === undefined) {
                    pageButtonSize = 10;
                }
                let startPageBlock = Math.floor((page - 1) / pageButtonSize) * pageButtonSize + 1;
                let endPageBlock = startPageBlock + pageButtonSize;
                let beforeEndBlock = endPageBlock; //변경 전 endBlock

                if (endPageBlock * pageBlockSize > this.viewDataSource.length) {
                    endPageBlock = Math.ceil(this.viewDataSource.length / pageBlockSize);
                }
                
                // 페이지 UI 생성
                // 이전 버튼
                let ul = document.createElement("ul");
                ul.setAttribute("class", "pagination pull-right");
                let a = document.createElement("a");
                a.setAttribute("href", "#");
                a.setAttribute("paging", page);
                a.appendChild(document.createTextNode("이전"));
                if (page !== 1) {
                    a.addEventListener("click", (e) => { 
                        let p = Number(e.target.getAttribute("paging"));
                        this.draw(p-1, this.drawId); 
                    });
                } else {
                    a.addEventListener("click", void(0));
                }
                let li = document.createElement("li");
                li.setAttribute("class", "footable-page-arrow");
                li.appendChild(a);
                ul.appendChild(li);

                // 숫자 페이지 버튼
                for (var i = startPageBlock; i <= endPageBlock; i++) {
                    a = document.createElement("a");
                    a.setAttribute("href", "#");
                    a.setAttribute("paging", i);
                    a.appendChild(document.createTextNode(i));

                    li = document.createElement("li");
                    li.setAttribute("class", "footable-page-arrow");
                    if (i === page) {
                        a.setAttribute("paging", i);
                        li.setAttribute("class", "footable-page active blue");
                    } else {
                        if (i === endPageBlock && endPageBlock === beforeEndBlock) { // i가 마지막이고, endPageBlock이 tatalEndBlock이랑 같을 때는
                            continue; // 마지막 페이지를 띄우지 않아도 됨.
                        }
                        li.setAttribute("class", "footable-page-arrow");
                        a.addEventListener("click", (e) => {
                            let p = Number(e.target.getAttribute("paging"));
                            this.draw(p, this.drawId);
                        });
                    }
                    li.appendChild(a);
                    ul.appendChild(li);
                }

                // 다음 버튼
                a = document.createElement("a");
                a.setAttribute("href", "#");
                a.setAttribute("paging", page);
                a.appendChild(document.createTextNode("다음"));
                if (page !== endPageBlock) {
                    a.addEventListener("click", (e) => { 
                        let p = Number(e.target.getAttribute("paging"));
                        this.draw(p+1, this.drawId);
                    });
                } else {
                    a.addEventListener("click", void(0));
                }
                li = document.createElement("li");
                li.setAttribute("class", "footable-page-arrow");
                li.appendChild(a);
                ul.appendChild(li);

                return ul;
            }

            /**
             * 생성한 테이블 갱신하기
             * @param {*} from 
             */
            redraw(from) {
                this.draw(from, this.drawId);
            }

            /**
             * 생성한 테이블 Dom 그리기
             * 
             * @param {*} drawId 테이블이 그려질 Dom Id
             */
            draw(from, drawId) {
                let viewDocument = 2147483647;
                if (this.paging.use) {
                    viewDocument = this.paging.viewDocument;
                }
                this.drawId = drawId;

                let table = document.createElement("table");
                table.setAttribute("id", this.id);
                table.setAttribute("class", "table table-striped " +this.clazz);

                if (!this.columns) {
                    console.error("table columns undefined.");
                }

                // 컬럼 생성
                let checkboxIdx = 0;
                let tr = document.createElement("tr");
                for (let i in this.columns) {
                    // 체크박스 컬럼 생성
                    if (this.columns[i].type === "checkbox") {
                        checkboxIdx = i;
                        let colgroup = document.createElement("colgroup");
                        colgroup.setAttribute("width", "5%");
                        table.appendChild(colgroup);
                        
                        let checkbox = Input.CheckBox;
                        checkbox = checkbox.setId("all_checkbox").addEventListener("click", (e) => {
                            // 체크박스 전체선택 기능
                            for (let dom in document.getElementsByClassName("checkbox")) {
                                if (typeof document.getElementsByClassName("checkbox")[dom] !== 'object') {
                                    continue;
                                }
                                document.getElementsByClassName("checkbox")[dom].checked = e.target.checked;
                            }
                        }).build();
                        let th = document.createElement("th");
                        th.appendChild(checkbox);
                        tr.appendChild(th);
                    } else {
                        let colgroup = document.createElement("colgroup");
                        colgroup.setAttribute("width", this.columns[i].width);
                        table.appendChild(colgroup);

                        // 컬럼명
                        let th = document.createElement("th");
                        th.appendChild(document.createTextNode(this.columns[i].field));

                        // 정렬 기능 사용여부
                        if (this.columns[i].sort) {
                            th.addEventListener("click", () => this.sorting(1, this.columns[i].field));

                            let icon = '▼';
                            if (!this.reverse && this.columns[i].field === this.sortField) icon = '▲';
                            let sortIcon = document.createElement("span");
                            sortIcon.appendChild(document.createTextNode(icon));
                            sortIcon.setAttribute("id", this.columns[i].field+ "_sorticon");
                            th.appendChild(sortIcon);
                        }

                        tr.appendChild(th);
                    }
                }
                let thead = document.createElement("thead");
                thead.appendChild(tr);
                table.appendChild(thead);
                
                // 데이터 생성
                let tbody = document.createElement("tbody");
                let page = (from-1)*viewDocument;
                let size = from*viewDocument;
                for (let i = page; i<size && i<this.viewDataSource.length; i++) {
                    tr = document.createElement("tr");
                    // TBody 영역
                    for (let field in this.viewDataSource[i]) {
                        let td = document.createElement("td");
                        if (this.columns[checkboxIdx].type === "checkbox" && this.columns[checkboxIdx].field === field) {
                            // 체크박스 생성
                            let checkbox = Input.CheckBox;
                            checkbox = checkbox.setClass("checkbox").setId(this.viewDataSource[i][field]).addEventListener("click", (e) => {
                                if (!e.target.checked) {
                                    document.getElementById("all_checkbox").checked = false;
                                }
                            }).build();
                            td.appendChild(checkbox);
                            tr.appendChild(td);
                        } else if (typeof this.viewDataSource[i][field] === 'object') {
                            // Dom Object 인 경우
                            td.appendChild(this.viewDataSource[i][field]);
                        } else {
                            // Text 인 경우
                            td.appendChild(document.createTextNode(this.viewDataSource[i][field]));
                        }
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);

                // 페이징 생성
                if (this.paging.use) {
                    let tfoot = document.createElement("tfoot");
                    let td = document.createElement("td");
                    td.appendChild(this.drawPaging(from, viewDocument, 5));
                    td.setAttribute("colspan", "999");

                    tr = document.createElement("tr");
                    tr.appendChild(td);

                    tfoot.appendChild(tr);
                    tfoot.setAttribute("colspan", "9");
                    table.appendChild(tfoot);
                }

                let node = document.getElementById(this.drawId);
                while (node.hasChildNodes()) {
                    node.removeChild(node.firstChild);
                }

                node.appendChild(table);
            }
        }

        return new Builder();
    }
}

function search() {
    let keyword = document.getElementById("keyword").value;
    table.search(1, "이름", keyword);
}

var table = undefined;
function createData(){
    let count = document.getElementById("count").value;
    let dataSource = [];

    for (let i = 0; i < count; i++){
        let icon = document.createElement("i");
        icon.setAttribute("class", "glyphicon glyphicon-off");
        icon.addEventListener("click", () => { alert(1234); });

        dataSource.push(
            { "체크박스": i, "이름": i, "나이": Math.ceil(Math.random()*10000), "주소": icon }
        )
    }

    let tableJson = {
        "columns": [
            { "field": "체크박스", "type": "checkbox", "width": "5%"},
            { "field": "이름", "width": "15%" },
            { "field": "나이", "width": "20%", "sort": true },
            { "field": "주소", "width": "60%", "sort": false }
        ],
        "dataSource": []
    }

    tableJson.dataSource = dataSource;
    table = Table.Builder;
    table.setClass("abcClass").setId("abcId").setPaging(10).setDataSource(tableJson).build(1, "test");
}

window.onload = () => {
    document.getElementById("count").value = 3;
    createData();
}