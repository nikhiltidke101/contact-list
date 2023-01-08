const url = 'https://jsonplaceholder.typicode.com/users';
const listContainer = document.getElementById("list");
var dataList = [];
function showSpinner() {
    var spinner = document.getElementById("spinner");
    spinner.style.display = "block";
}
  
function hideSpinner() {
    var spinner = document.getElementById("spinner");
    spinner.style.display = "none";
}

const getData = document.getElementById("get-data").addEventListener("click", (e) => {
    const getDataBtn = document.getElementById("get-data");

    getDataBtn.classList.remove("border-b-4", "border-l-2", "border-black");

    listContainer.innerHTML = "";
    showSpinner();
    const fetchData = new Promise((resolve, reject) => {
        setTimeout(()=>{
            fetch(url)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        },5000);
      });
      
      fetchData.then(data => {
            console.log(data);
            dataList = data;
            hideSpinner();
            renderData(data);
      }).catch(error => {
            console.log('Promise rejected.');
            console.log(error.message);
            hideSpinner();
      });

      setTimeout(()=>{
        getDataBtn.classList.add("border-b-4", "border-l-2", "border-black");
      },100)
})

const searchInput = document.getElementById("search-text");

searchInput.addEventListener("change", (e)=>{
    const filteredData = dataList.filter(item => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    renderData(filteredData);
})



const renderData = (data) => {
    const searchInput = document.getElementById("search-text");
    listContainer.innerHTML = "";

    data.forEach(user => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
        <div class="p-6 border-box border-b-4 border-l-2 border-r-2 border border-black w-96 h-96 rounded-2xl bg-slate-200">
            <table class="border-box border-separate border-spacing-4">
                <tr class="text-xl font-bold">
                    <td>Name</td>
                    <td>${user.name}</td>
                </tr>
                <tr class="text-lg font">
                    <td>Email</td>
                    <td>${user.email}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>${user.phone}<</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td>${user.website}</td>
                </tr>
                <tr>
                    <td>Company</td>
                    <td>${user.company.name}</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>${user.address.city}</td>
                </tr>
                <tr>
                    <td>Zipcode</td>
                    <td>${user.address.zipcode}</td>
                </tr>
            </table>
        </div>
        
        `
        listContainer.appendChild(listItem);
    });
    
    searchInput.value = "";
}

// renderData(dataList);