// const url_base_path = 'http://10.0.0.211:8080';
const url_base_path = '';

onload = (event) => {
    httpGetAsync('/api/cars/brands', data => {
        brandsSelect = document.getElementById('brandInput');
        emptySelect(brandsSelect);

        var opt   = document.createElement("option");
        opt.value = 'B';
        opt.text  = 'Choose...';
        brandsSelect.appendChild(opt);

        JSON.parse(data).forEach(brand => {
            var opt = document.createElement("option");
            opt.value = brand['_id'];
            opt.text = brand.name;
            brandsSelect.appendChild(opt);
        });
    });

    reloadPictures();
    updateSightings()
};

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url_base_path + theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function emptySelect(selectElement){
    while (selectElement.options.length > 0){
        selectElement.remove(selectElement.options.length - 1);
    }
}

function onBrandSelect() {
    brandId = document.getElementById('brandInput').value;
    modelSelect = document.getElementById('modelInput')
    emptySelect(modelSelect);
    
    var opt   = document.createElement("option");
    opt.value = 'M';
    opt.text  = 'Choose...';
    modelSelect.appendChild(opt);
    
    httpGetAsync(`/api/cars/brands/${brandId}/models`, data => {
        JSON.parse(data).forEach(model => {
            var opt = document.createElement("option");
            opt.value = model['_id'];
            opt.text = model.name;
            modelSelect.appendChild(opt);
        });
    });
}

function uploadFile() {
    const form = document.getElementById('addNewPictureForm');

    console.log(form);

    fetch(url_base_path + '/api/images/upload', { method: 'post', body: new FormData(form) }).then(() => reloadPictures());    
}

function reloadPictures() {
    httpGetAsync('/api/images/images', data => {
        pictures = JSON.parse(data);

        pictureSelect = document.getElementById('pictureInput')
        emptySelect(pictureSelect);
        
        var opt   = document.createElement("option");
        opt.value = 'P';
        opt.text  = 'Choose...';
        pictureSelect.appendChild(opt);
        
        pictures.forEach(picture => {
            var opt = document.createElement("option");
            opt.value = picture;
            opt.text = picture;
            pictureSelect.appendChild(opt);
        });

        first = true;
        carouselInner = document.getElementById('pictureCarouselInner');
        carouselInner.innerHTML = '';

        pictures.forEach(image => {
            // <div class="carousel-item">
            var div = document.createElement('div');
            div.className = 'carousel-item';
            if (first){
                first = false;
                div.className += " active";
            }

            var img = document.createElement('img');
            
            // <img src="..." class="d-block w-100" alt="...">
            img.src = `${url_base_path}/api/images/images/${image}`;
            img.className = 'd-block w-100';
            img.alt = image;            
            div.appendChild(img);
            
            var p = document.createElement('p');
            p.innerHTML = image;

            var pdiv = document.createElement('div');
            pdiv.appendChild(p);
            pdiv.className = 'carousel-caption d-none d-md-block';
            div.appendChild(pdiv);

            carouselInner.appendChild(div);
        });
    });
}

function addSighting() {
    brand = document.getElementById('brandInput').value;
    model = document.getElementById('modelInput').value;
    picture = document.getElementById('pictureInput').value;
    desc = document.getElementById('descriptionInput').value;

    if (brand === 'B' || model === 'M' || picture === 'P') {
        return;
    }

    fetch(url_base_path + '/api/sightings/sightings', { headers: {'content-type':'application/json'},  method: 'post', body: JSON.stringify({
        brandId: brand, 
        modelId: model,
        image: picture,
        description: desc
    }) }).then(r => updateSightings() );
}

name_cache = {};

function updateSightings() {
    httpGetAsync('/api/sightings/sightings', data => {
        sightings = JSON.parse(data);

        tbody = document.getElementById('sightingstbody')
        
        brandsCallbacksById = {};
        modelsCallbacksById = {};

        JSON.parse(data).forEach(sighting => {
            var th = document.createElement("th");
            th.scope = 'row';
            th.innerHTML = sighting.id;

            var td1  = document.createElement("td");
            td1.innerHTML = sighting.brandId;

            if(brandsCallbacksById[sighting.brandId] == null){
                brandsCallbacksById[sighting.brandId] = [];
            }
            
            brandsCallbacksById[sighting.brandId].push(brandName => {
                td1.innerHTML = brandName;
            });

            var td2  = document.createElement("td");
            td2.innerHTML = sighting.modelId;

            if(modelsCallbacksById[sighting.modelId] == null){
                modelsCallbacksById[sighting.modelId] = [];
            }

            modelsCallbacksById[sighting.modelId].push(modelName => {
                td2.innerHTML = modelName;
            });

            var td3  = document.createElement("td");
            td3.innerHTML = sighting.image;

            var tr = document.createElement("tr");
            tr.appendChild(th);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            var tr2 = document.createElement("tr");
            var td4  = document.createElement("td");
            td4.colSpan=4;
            td4.innerHTML = sighting.description;
            tr2.appendChild(td4);

            tbody.appendChild(tr);
            tbody.appendChild(tr2);
        });

        Object.keys(brandsCallbacksById).forEach(brandId => {
            httpGetAsync(`/api/cars/brands/${brandId}`, dataBrand => {
                brand = JSON.parse(dataBrand);
                brandsCallbacksById[brandId].forEach(callback => callback(brand.name));
            });
        });

        Object.keys(modelsCallbacksById).forEach(modelId => {
            httpGetAsync(`/api/cars/models/${modelId}`, dataModel => {
                model = JSON.parse(dataModel);
                modelsCallbacksById[modelId].forEach(callback => callback(model.name));
            });
        });
    });
}