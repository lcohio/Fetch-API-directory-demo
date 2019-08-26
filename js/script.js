$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json'
}).done(function(data){
    $.each(function(i, item){
        $('#gallery').append(`
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${item.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">first last</h3>
                <p class="card-text">email</p>
                <p class="card-text cap">city, state</p>
            </div>
        </div>        
        `)
    });
});