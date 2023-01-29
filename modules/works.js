export class worksitem{
    constructor(work){
        this.id = work.id;
        this.title = work.title;
        this.role = work.role;
        this.logo = work.logo;
        this.status = work.status;
        this.location = work.location;
        this.worktime = work.worktime;
        this.salary = work.salary;
        this.Requirement = work.Requirement;
        this.save = work.save;
    }
    Render(){
        return `<div class="work-head">
            <div class="company">
            <img src="${this.logo}" alt="">
            <div>
                <h4>${this.title}</h4>
                <p>${this.role}</p>
            </div>
            </div>
            <img src="./photos/star.png" class="star-save" alt="">
        </div>
        <p><span class="text-bold">Байршил</span> : ${this.location}</p>
        <p><span class="text-bold">Ажиллах цаг</span> : ${this.worktime}</p>
        <p><span class="text-bold">Цалин</span> : ${this.salary}</p>
        <p><span class="text-bold">Тавигдах шаардлага</span> : ${this.Requirement}</p>
        <button class="btn">learn more</button>
        </div>`
    }
}
export default class works{
    constructor(worksUrl){
        this._worksList = [];
        this._worksUrl = worksUrl;
    }
    Render(target){
        this._worksList.forEach(work => {
            if(target !== "")
                document.getElementById(target).innerHTML += (new worksitem(work)).Render();
            else
                return (new worksitem(work)).Render();
        })
    }
    Download(targetElm){
        fetch('${this._workUrl}/latest')
            .then(result => {
                result.json()
                    .then(jsob => {
                        const filtered = jsob.filter(workitem => workitem.status == "requested")
                        if(filtered.length > 0){
                            gebi(targetElm).insertAdjacentHTML("afterbegin",
                            filtered.map(newwork => {
                                const _newwork = new worksitem(newwork);
                                this._worksList.push(_newwork);
                                return _newwork.Render();
                            })
                            .reduce((prevVal,curVal) => prevVal + curVal, "")
                            );
                        }
                    })
            })
            .catch(err => {console.log(err)});
    }
}
const gebi = id => document.getElementById(id);