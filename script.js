$(document).ready(function(){

    function loadPage(page){
    $("#content").hide().load(page + "?v=" + new Date().getTime(), function(){
        $("#content").fadeIn(500);
        runPageScript(page);
    });
}

    function runPageScript(page){

        if(page === "contact.html"){

            $("#nama").val(localStorage.getItem("nama"));
            $("#email").val(localStorage.getItem("email"));
            $("#pesan").val(localStorage.getItem("pesan"));

            $("#kirim").click(function(){

                let nama = $("#nama").val();
                let email = $("#email").val();
                let pesan = $("#pesan").val();

                let valid = true;

                $(".error").text("");

                if(nama === ""){
                    $("#errNama").text("Nama wajib diisi");
                    valid = false;
                }

                if(!email.includes("@")){
                    $("#errEmail").text("Email tidak valid");
                    valid = false;
                }

                if(pesan.length < 5){
                    $("#errPesan").text("Pesan minimal 5 karakter");
                    valid = false;
                }

                if(valid){
                    localStorage.setItem("nama", nama);
                    localStorage.setItem("email", email);
                    localStorage.setItem("pesan", pesan);

                    $("#notif")
                        .hide()
                        .fadeIn(300)
                        .delay(1500)
                        .fadeOut(300, function(){

                            $("#contactOptions").fadeIn(500);

                            $("#wa").attr("href",
                                "https://wa.me/085727423766?text=Halo saya " + nama + ", " + pesan
                            );

                            $("#ig")
                                .attr("href","https://instagram.com/rsm_03myg")
                                .text("@rsm_03myg");

                            $("#mail")
                                .attr("href","mailto:rnurdiani0802@gmail.com")
                                .text("rnurdiani0802@gmail.com");
                        });
                }
            });
        }

        if(page === "github.html"){

            let username = "risma0208";

            $("#githubData").text("Loading...");

            $.ajax({
                url: "https://api.github.com/users/" + username,
                success: function(data){
                    $("#githubData").html(`
                        <img src="${data.avatar_url}" width="100">
                        <p>${data.login}</p>
                        <p>Followers: ${data.followers}</p>
                        <p>Repo: ${data.public_repos}</p>
                    `);
                },
                error: function(){
                    $("#githubData").text("Gagal ambil data");
                }
            });
        }
    }

    loadPage("home.html");

    $(".menu").click(function(){
        $(".menu").removeClass("active");
        $(this).addClass("active");

        let page = $(this).data("page");
        loadPage(page);
    });

    $(".burger").click(function(){
        $(".nav-menu").toggleClass("show");
    });

});