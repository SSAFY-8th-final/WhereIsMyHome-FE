<template>
  <!-- ======= Header ======= -->
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <a href="/" class="logo d-flex align-items-center">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.png" alt=""> -->
        <h1>Where Is My Home<span>.</span></h1>
      </a>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
        <ul>
          
          <li class="dropdown">
            <a href="#"
              ><span>Admin</span> <i class="bi bi-chevron-down dropdown-indicator"></i
            ></a>
            <ul>
              <li><router-link to="/admin/event">이벤트 관리</router-link></li>
              <li><router-link to="/admin/notice">공지사항 관리</router-link></li>
              <li><router-link to="/admin/user">사용자 관리</router-link></li>
            </ul>
          </li>
          <li><router-link to="/map">Map</router-link></li>
          <li><router-link to="/fav">Fav</router-link></li>
          <li><router-link to="/event">Event</router-link></li>
          <li><router-link to="/notice">Notice</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          
        </ul>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
  <!-- End Header -->
</template>

<script>
export default {};
</script>

<style></style>
