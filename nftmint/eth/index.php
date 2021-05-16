<?php
// Start the session
session_start();
?>
<!DOCTYPE html>



<html lang="EN-US">

<head>

	<style>

  .content-area {
  border-color: mediumvioletred;
    border-style: solid;
    background-color: rgba(0,0,0,.8);
    border-radius: 25px;
    padding-top: 2%;
    margin-bottom: 15px;
  }

  .content-area-purple {
  border-color: mediumvioletred;
    border-style: solid;
    background-color: rgba(255,255,255,.9);
    border-radius: 25px;
    padding-top: 2%;
  }

  .additional {
    padding:10px !important;
  }

  .nft {
    width: 66%;
    margin-top:10px;
  }

  .shadow {
  -webkit-filter: drop-shadow(2px 2px 10px #d932a9);
  filter: drop-shadow(2px 2px 10px #d932a9);
}

.golden {
  -webkit-filter: drop-shadow(2px 2px 10px #d9d132);
  filter: drop-shadow(2px 2px 10px #d9d132);
}
  
  .prettylink a {
    color: mediumvioletred !important;
  }

  /* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.modal {
    display:    none;
    position:   fixed;
    z-index:    1000;
    top:        0;
    left:       0;
    height:     100%;
    width:      100%;
    background: rgba( 0, 0, 0, .8 ) 
                url('') 
                50% 50% 
                no-repeat;
}

.modal #unopened {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading .modal {
    overflow: hidden;   
}

/* Anytime the body has the loading class, our
   modal element will be visible */
body.loading .modal {
    display: block;


}

  </style>


  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

  <meta name="description" content="DIRTY FINANCE">

  



  <title>DIRTY FINANCE</title>



<!-- Mobile Specific Meta

  ================================================== -->

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta property="og:image" content="images/minilogo.png" />

  <!-- Favicon -->

  <link rel="shortcut icon" type="image/x-icon" href="images/icontab.jpg" />

  

  <!-- CSS

  ================================================== -->

  <!-- Icon font -->

  <link rel="stylesheet" href="plugins/themefisher-font.v-2/style.css">

  <!-- bootstrap.min css -->

  <link rel="stylesheet" href="plugins/bootstrap/dist/css/bootstrap.min.css">

  <!-- Slick Carousel -->

  <link rel="stylesheet" href="plugins/slick-carousel/slick/slick.css">

  <link rel="stylesheet" href="plugins/slick-carousel/slick/slick-theme.css">

  <!-- Main Stylesheet -->

  <link rel="stylesheet" href="css/style.css">



  <!-- google fonts-->

  <link rel="preconnect" href="https://fonts.gstatic.com">

<link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet">

<link rel="preconnect" href="https://fonts.gstatic.com">

<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">



<!-- scroll animation -->

<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

  <script src='https://kit.fontawesome.com/a076d05399.js'></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  

</head>



<body id="body">



 <!--

  Start Preloader

  ==================================== -->

  <div id="preloader">

    <div class="preloader">

      <div class="sk-circle1 sk-child"></div>

      <div class="sk-circle2 sk-child"></div>

      <div class="sk-circle3 sk-child"></div>

      <div class="sk-circle4 sk-child"></div>

      <div class="sk-circle5 sk-child"></div>

      <div class="sk-circle6 sk-child"></div>

      <div class="sk-circle7 sk-child"></div>

      <div class="sk-circle8 sk-child"></div>

      <div class="sk-circle9 sk-child"></div>

      <div class="sk-circle10 sk-child"></div>

      <div class="sk-circle11 sk-child"></div>

      <div class="sk-circle12 sk-child"></div>

    </div>

  </div> 

  <!--

  End Preloader

  ==================================== -->



<section class="header  navigation">

    <div class="container">

        <div class="row">

            <div class="col-md-12">

			

                <nav class="navbar navbar-expand-lg">



				<li class="nav-item">

                        <a class="" href="https://cash.dirty.finance/nft">

                        <img src="images/minilogo.png" alt="logo" width="70">

                    </a>

                    </li>

					

					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

                    <span class="tf-ion-android-menu"></span>

                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

					

					

                        <ul class="navbar-nav ml-auto">

						

                            <li class="nav-item">

                                <a class="nav-link" href="https://drive.google.com/file/d/1NKiXRCIDl2pTd8mYjeqTQtoIruEejlLP/view?usp=sharing" target="blank">WHITEPAPER <span class="sr-only">(current)</span></a>

                            </li>

                            <li class="nav-item">

                                <a class="nav-link" href="https://drive.google.com/file/d/17BFxh5XH4ZQJiYbfgP64jAZVryKe435N/view?usp=sharing" target="blank">TOKEN DISTRIBUTION</a>

                            </li>

                            <li class="nav-item">

                                <a class="nav-link" href="#token">ROADMAP</a>

                            </li>

							 <li class="nav-item">

                                <a class="nav-link" href="https://www.dextools.io/app/uniswap/pair-explorer/0xcdc477f2ccff2d8883067c9f23cf489f2b994d00" target="blank">CHART</a>

                            </li>

							 <li class="nav-item">

                                <a class="nav-link" href="https://info.uniswap.org/token/0x4faB740779C73aA3945a5CF6025bF1b0e7F6349C" target="blank">BUY ON UNISWAP</a>

                            </li>

							<!--

                            <li class="nav-item">

                                <a class="nav-link" href="login.html">Sign In</a>

                            </li>

                            <li class="nav-item">

                                <a class="nav-link" href="signup.html">Sign Up</a>

                            </li>



                            <li class="nav-item dropdown">

                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                    Pages

                                </a>

                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <a class="dropdown-item" href="team.html">Team Page</a>

                                    <a class="dropdown-item" href="404.html">404 Page</a>

                                    <a class="dropdown-item" href="blog.html">Blog Page</a>

                                </div>

                            </li>-->

							

							

					

                        </ul>

						

                    </div>

					<ul class="currency-status">

                        <li class="nav-item">

                        <a class="nav-link" href="https://twitter.com/FinanceDirty" target="blank">

                            <img src="images/icons/twitter.png" width="20" />

                        </a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link" href="https://t.me/DIRTYFIN" target="blank">

                            <img src="images/icons/telegram.png" width="20"/>

                        </a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link" href="https://www.facebook.com/DirtyFinance" target="blank">

                           <img src="images/icons/facebook.png" width="20"/>

                        </a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link" href="https://youtube.com/channel/UCH7mghzzClHuTUSZ8son4Fg" target="blank">

                           <img src="images/icons/youtube.png" width="20"/>

                        </a>

                    </li>

                    <li class="nav-item">

					<a class="nav-link" href="https://www.instagram.com/p/CN5SGJlnHMk/?igshid=1v2o7ceaq2vxj" target="blank">

                       <img src="images/icons/ig.png" width="20"/>

					   </a>

                    </li>

					

                   </ul>

                    

                </nav>

                

            </div>

        </div>

        
</section>

<section style="padding-bottom: 10px !important; padding-top: 10px !important; background-color: mediumvioletred;">

	<div class="container">
		<div class="row" id="wallet-row">

        	<!-- Construct a Bootstrap layout -->
			    <div class="container">
			      <div class="row">
			        <div class="col-md-12">
			         
			          <div id="prepare">
			            <button class="btn btn-success pull-right" id="btn-connect">
			              Connect wallet
			            </button>
			            <button class="btn btn-warning pull-right" id="btn-disconnect" style="display: none">
			              Disconnect wallet
			            </button>
			          </div>  <!--#prepare-->

			          	<div id="web3-wallet"></div>

			          

			        </div> <!--.container-->
			      </div> <!--.row-->
			    </div> <!--.col-md-12-->
 		</div> <!--#wallet-row-->
 	</div><!--.container-->
 </section>

<section style="padding-bottom: 10px !important; padding-top: 10px !important; background-color: darkred;">
 <div class="container">
 	<div class="row">
    <div class="col-md-12">
 		<span style="color:white"><strong>WARNING: YOU MUST BE 18 YEARS OF AGE OR OLDER TO VIEW THIS SITE!</strong>&nbsp;This site features mature content for adults only. If you are under the age of 18, please disconnect from this site and tell your parents to invest in Dirty Finance!</span>
  </div>
 	</div>
 	</div>
 </section>

 <!--

Welcome Slider

==================================== -->

 



<section class="hero-area" style="padding-bottom: 10px !important">

	<div class="container">


	

			<center>

					<img class="img-responsive" src="images/nft_promp_header.png" style="margin-top:-8%;" width="100%" />

			</center>

			<br>

			<div class="row" style="margin-top: -10px; margin-bottom:100px">

			

			<div class="col-md-12 col-xs-12  content-area">

				<div class="block">

				<div id="connected" style="display: none">

				            <hr>
				            
				            <div id="correctnetwork">
                      <div class="row">
                        <div class="col-md-12 additional">
                          <div class="col-md-12 content-area" style="margin-top: -20px">
                          <span style="color:red"><h2>Warning:</h2></span><span style="color:white">Due to the high gas fees on the Ethereum network, we HIGHLY suggest you wait until our BSC version rolls out <span style="color:mediumvioletred">Friday, May 14th at 7PM UTC</span>. Minting NFT's on ETH network right now is VERY expensive, and if your TX fails (for whatever reason) you will lose your transaction fees. Please use this site with extreme caution!!</span><br><br><br>
                        </div>

                        </div>
                      </div>
				            	<div class="row">
				            		<div class="col-md-8">
						              <p>
						                <strong>Connected to:</strong> <span id="network-name"></span><span><img src="eth.png" width="48px" height="48px"c></span>
						              </p>

						              <p>
						                <strong>My Address:</strong> <span id="my-address" style="color:orange"></span>
						              </p>

						              <p>
						                <strong>Ethereum Balance:</strong> <span id="my-eth-balance" style="color:blue"></span>
						              </p>

						              <p>
						                <strong>My Dirty Balance:</strong> <span id="my-token-balance" style="color:green"></span>
						              </p>
						              <p>
						                <strong>My Dirty NFT's:</strong> <span id="my-nft-balance" style="color:mediumvioletred"></span>
						              </p>
				              	</div>
				              	<div class="col-md-4">
				              		<button id="mint-nft" class="btn btn-success" style="background-color:mediumvioletred;border-color:mediumvioletred" onclick="mintNFT()">Mint promotional NFT</button>
				              		<br>

				              		<div id="nft-tx" style="display: none; word-break: break-all;"></div>
				              		<div id="showLoading" style="display: none"><img src="loading.svg"></div>
				              		<div id="submitted" class="alert alert-info" style="display:none">Transaction Submitted! Please wait..</div>
				              		<div id="approved" class="alert alert-success" style="display:none">Transaction Successful!</div>
                          <div id="validation" style="display: none; word-break: break-word;"></div>
                          <div id="bsc-mint" style="display:none">
                            <br>
                            <a href="https://cash.dirty.finance/nft/bsc/"><button class="btn btn-warning">Mint on BSC</button></a><br>
                          </div>
				              	</div>
				              </div><!--.row-->
				              <br><br>
				              <div class="row">
				              	<div class="col-md-6">
				              		<div id="minted" class="content-area additional" style="margin-right:3%">
				              			<h4>My $DIRTY NFT Collection</h4>
				              			<div id="my-dirty-collection" class="col-md-12" style="background-color: mediumvioletred; display: none">
				              				<br>
				              				<p>
				                			<span id="my-nft-img"></span>
				              				</p>
				              				<p>
				                			<center><span id="my-nft-name"></span></center>
				              				</p>
				              				<p>
				                			<center><span id="my-nft-desc"></span></center>
				              				</p>
				              				<p>
				              				<center><strong><a href="#" onclick="$('#showattrib').toggle();return false;">Click for Attributes</a></strong></center><br>
				              				<div id="showattrib" style="display:none">
				              				<p>
				                			<span id="my-nft-attr" style="word-break: break-all;"></span>
				              				</p>
				              				<center>
				              				<p>
				                			<span id="my-nft-uri" style="font-size:small; word-break: break-all;"></span>
				              				</p>
				              				</center>
				              				</div>
				              			</div>
				              			<div id="no-dirty-collection" class="col-md-12">
				              				You have no $DIRTY NFT's in your collection!
				              			</div>
				              		</div>

				              	</div><!--.col-md-8-->

                        <div class="col-md-6">
                          <div class="content-area additional" style="margin-right:3%">
                            <div id="showshare" class="col-md-12" style="display:none">
                              <span style="color:mediumvioletred">Share your mint in the telegram channel (long press on mobile -> share or right click/copy on pc; if you are in dapp browser, take a screenshot/crop):<br>
                                <div id="shareimg"></div>
                              <br><br>
                            </div>
                            <div class="clearfix"></div> 
                            <h4>Mint Statistics</h4>
                            <div id="" class="col-md-12" style=""><br>
                             Total Minted:<span id="tmresults" style="color:green"></span><br><br>
                             <span style="color:orange">Dirty Temptation</span> total # minted:<span id="dtresults" style="color:orange"></span><br>
                             <span style="color:yellow">Dirty Cheerleader</span> total # minted:<span id="dcresults" style="color:yellow"></span><br>
                             <span style="color:yellow">Dirty Beachbabe</span> total # minted:<span id="dbbresults" style="color:yellow"></span><br>
                             <span style="color:blue">Neon Cheerleader</span> total # minted:<span id="ncresults" style="color:blue"></span><br>
                             <span style="color:blue">Neon Beachbabe</span> total # minted:<span id="nbbresults" style="color:blue"></span><br>
                             <span style="color:green">Original Cheerleader</span> total # minted:<span id="ocresults" style="color:green"></span><br>
                             <span style="color:green">Original Beachbabe</span> total # minted:<span id="obbresults" style="color:green"></span><br>
                            </div>
                            
                            
                          </div>

                        </div><!--.col-md-8-->

				              </div><!--.row-->


				            </div> <!--#correctnetwork-->

				            <hr>

				            <div id="incorrectnetwork">
				              <p>
				                <h3><span style="color:red">You are connected to the wrong blockchain!</span></h3>
				              </p>

				              <p>
				                Please connect your wallet to the <span style="color:blue"><strong>Ethereum Mainnet Network</strong></span>
				              </p>

				            </div> <!--#incorrectnetwork-->

			    </div> <!--#connected-->

			    <div id="disconnected" class="panel">

			    	<h4>As a reward for being an early <span style="color:mediumvioletred">$DIRTY</span> investory, we are giving away <span style="color:green">690</span> mintings of <span style="color:mediumvioletred">$DIRTY</span> NFT's with original artwork commissioned ONLY for dirty.finance. <BR><br>Each wallet holding at least <span style="color:green">100 Million</span> <span style="color:mediumvioletred">$DIRTY</span> will be allowed to mint ONE of SEVEN limited edition NFT. The NFT will be minted at random, with a chance to mint a full-nude <span style="color:orange">5 star</span> or rare <span style="color:blue">Neon</span> or <span style="color:yellow">Dirty</span> edition variants. Below is the breakdown of each NFT and their chance of mint:<br><br>
            <center>
              <div class="col-md-10" style="margin-left: -25px">
                <div class="row">
                <div class="col-md-4"><div class="content-area"><img src="images/stills/dtemporig.png" class="img-fluid golden" width="88%"><br><span style="color:orange">Dirty Temptation 5 Star XXX</span><br><span style="color:red">2%</span> chance to mint</div></div>

                <div class="col-md-4"><div class="content-area"><img src="images/stills/dcdirty.png" class="img-fluid golden"  width="88%"><br><span style="color:yellow">Cheerleader "dirty" edition</span><br><span style="color:orange">9%</span> chance to mint</div></div>

                <div class="col-md-4"><div class="content-area"><img src="images/stills/dbbdirty.png" class="img-fluid golden"  width="94%"><br><span style="color:yellow">Beachbabe "dirty" edition</span><br><span style="color:orange">9%</span> chance to mint</div></div>

                <div class="col-md-3"><div class="content-area"><img src="images/stills/dcneon.png" class="img-fluid shadow"  width="88%"><br><span style="color:blue">Cheerleader "neon" edition</span><br><span style="color:yellow">15%</span> chance to mint</div></div>

                <div class="col-md-3"><div class="content-area"><img src="images/stills/dbbneon.png" class="img-fluid shadow"  width="88%"><br><span style="color:blue">Beachbabe "neon" edition</span><br><span style="color:yellow">15%</span> chance to mint</div></div>

                <div class="col-md-3"><div class="content-area"><img src="images/stills/dcorig.png" class="img-fluid shadow"  width="88%"><br><span style="color:green">Cheerleader original</span><br><span style="color:green">25%</span> chance to mint</div></div>

                <div class="col-md-3"><div class="content-area"><img src="images/stills/dbborig.png" class="img-fluid shadow"  width="88%"><br><span style="color:green">Beachbabe original</span><br><span style="color:green">25%</span> chance to mint</div></div>

              </div>
            </div>
            </center>
			      <br><center>
			    	Please connect your wallet above if you are:<br><br>
            <ul><li> <span style="color:darkred">Over 18</span> and a <span style="color:mediumvioletred">$DIRTY</span> holder with <span style="color:green">100 Million</span> <span style="color:mediumvioletred">$DIRTY</span> or more</li><ul><br> and you can mint your first <span style="color:mediumvioletred">$DIRTY</span> NFT.<br><br> GOOD LUCK!</h4></center><br><br><center><button class="btn btn-info" onclick="$('html,body').scrollTop(0);">Back to top</button></center><br><br>

			    </div>

				</div> <!--.block-->


			</div> <!--.col-md-6-->


			
			

		</div> <!--.row-->



	</div> <!--.container-->

	

</section>





		







<footer id="footer" class="bg-one">



<div class="top-footer">

    <div class="container">

     <img class="img-fluid rounded" src="images/footer.png">

    </div> <!-- end container -->

  </div>

  

  <div class="footer-bottom">

  

	<ul class="currency-status">

	

                        <li class="nav-item">

                        <a class="nav-link" href="https://twitter.com/FinanceDirty" target="blank">

                            <img src="images/icons/twitter.png" width="20" />

                        </a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link" href= "https://t.me/DIRTYFIN" target="blank">

                            <img src="images/icons/telegram.png" width="20"/>

                        </a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link" href="https://www.facebook.com/DirtyFinance" target="blank">

                           <img src="images/icons/facebook.png" width="20"/>

                        </a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link" href="https://t.me/DIRTYFIN" target="blank">

                           <img src="images/icons/youtube.png" width="20"/>

                        </a>

                    </li>

                    <li class="nav-item">

					<a class="nav-link" href="https://www.instagram.com/p/CN5SGJlnHMk/?igshid=1v2o7ceaq2vxj" target="blank">

                       <img src="images/icons/ig.png" width="20"/>

					   </a>

                    </li>

					

                   </ul>

				   <h5>Copyright 2021. All rights reserved.</h5>

    <h6>DIRTY FINANCE </h6>

  </div>

</footer> <!-- end footer -->

<div id="ohdirtypack" class="modal"><!-- Place at bottom of page --><center><img style="margin-top: 10%" class="img-fluid" id="unopened" src="https://cash.dirty.finance/nft/images/unopened.png" width="370px" height="490px"><img id="opened" src="https://cash.dirty.finance/nft/images/opened.png" class="img-fluid" style="display:none;margin-top: 10%;padding-top:75px" width="365px" height="490px"></center></div>

<button onclick="topFunction()" id="myBtn" title="Go to top"><i class="fa fa-angle-double-up"></i></button>

    <!-- end Footer Area

    ========================================== -->





    

    <!-- 

    Essential Scripts

    =====================================-->

    

    <!-- Main jQuery -->

    <script src="plugins/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap -->

    <script src="plugins/bootstrap/dist/js/popper.min.js"></script>

    <script src="plugins/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Owl Carousel -->

    <script src="plugins/slick-carousel/slick/slick.min.js"></script>

    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

    <!-- Smooth Scroll js -->

    <script src="plugins/smooth-scroll/dist/js/smooth-scroll.min.js"></script>

    

    <!-- Custom js -->

    <script src="js/script.js"></script>

    <script type="text/javascript" src="https://unpkg.com/web3@1.2.11/dist/web3.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/web3modal@1.9.0/dist/index.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider@1.2.1/dist/umd/index.min.js"></script>
    <script type="text/javascript" src="chaindata.js"></script>
    <script type="text/javascript" src="./ohdirtymint.js"></script>
	

	<script>

$(function() {

    $('.scroll-down').click (function() {

      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');

      return false;

    });

  });

</script>



<script>

//Get the button

var mybutton = document.getElementById("myBtn");



// When the user scrolls down 20px from the top of the document, show the button

window.onscroll = function() {scrollFunction()};



function scrollFunction() {

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

    mybutton.style.display = "block";

  } else {

    mybutton.style.display = "none";

  }

}



// When the user clicks on the button, scroll to the top of the document

function topFunction() {

  document.body.scrollTop = 0;

  document.documentElement.scrollTop = 0;

}


</script>



  </body>

  </html>

