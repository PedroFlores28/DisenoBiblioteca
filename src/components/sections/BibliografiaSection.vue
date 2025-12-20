<template>
  <!-- Vista detallada cuando se hace clic desde el header -->
  <div v-if="showDetailedView" id="bibliografia-detailed" class="bibliografia-detailed-view">
    <!-- Hero Section -->
    <div class="bibliografia-hero" :style="{ backgroundImage: `url(${currentHeroBackground})` }">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <p class="hero-subtitle">Escoge tu carrera para ver su Bibliografía Básica.</p>
        <h1 class="hero-title">Bibliografía por escuela</h1>
      </div>
      <button class="floating-btn">
        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.3292 5.30168C15.6865 5.70653 14.8383 6.15637 13.8036 6.64477C12.3127 7.35166 10.9954 7.87861 9.87719 8.19993C9.61371 8.27704 9.31168 8.32203 8.99679 8.34131C8.6819 8.32203 8.37986 8.27704 8.11639 8.19993C6.99822 7.87219 5.68083 7.35166 4.18993 6.64477C3.16173 6.15637 2.31346 5.70653 1.67083 5.30168C1.61942 5.26955 1.53588 5.21171 1.45234 5.14102C1.31096 5.02535 1.28526 4.8904 1.28526 4.81328C1.28526 4.73617 1.30453 4.59479 1.45234 4.47912C1.55516 4.402 1.6387 4.33774 1.70296 4.29918C2.34559 3.90075 3.18101 3.45734 4.18993 2.97537C5.68083 2.26848 6.99822 1.74152 8.11639 1.42021C8.37986 1.34309 8.6819 1.29811 8.99679 1.27883C9.31168 1.29811 9.61371 1.34309 9.87719 1.42021C10.9954 1.74795 12.3127 2.26848 13.8036 2.97537C14.819 3.45734 15.6544 3.90075 16.2906 4.29918C16.3549 4.33774 16.4384 4.402 16.5412 4.47912C16.689 4.59479 16.7083 4.73617 16.7083 4.81328C16.7083 4.8904 16.689 5.02535 16.5412 5.14102C16.4513 5.21171 16.3742 5.26955 16.3227 5.30168H16.3292ZM13.1289 11.4645C11.9979 11.9786 10.9568 12.3834 10.0186 12.6726C9.7101 12.769 9.35666 12.8268 8.99679 12.8461C8.63692 12.8268 8.27704 12.769 7.97501 12.6726C7.03677 12.3834 5.98929 11.9786 4.86469 11.4645C4.6462 11.3617 4.49839 11.1367 4.49839 10.8861V8.19993C5.70653 8.73974 6.799 9.15744 7.75652 9.4402C8.12924 9.54945 8.53409 9.61371 8.96466 9.63299H9.02892C9.45948 9.61371 9.86434 9.54302 10.2371 9.4402C11.1946 9.16387 12.287 8.73974 13.4888 8.20636V10.8861C13.4888 11.1367 13.3474 11.3681 13.1225 11.4645H13.1289ZM18 4.81971C18 4.29275 17.7558 3.80436 17.3381 3.47662C17.1903 3.36094 17.0618 3.27098 16.9718 3.21314C16.2906 2.789 15.4166 2.32631 14.3563 1.82506C12.8076 1.08604 11.4195 0.539808 10.2371 0.199215C9.86434 0.0899688 9.45948 0.0257051 9.02892 0H8.96466C8.53409 0.0192788 8.12924 0.0899688 7.75652 0.199215C6.57408 0.546234 5.19243 1.09247 3.63727 1.83149C2.58336 2.33274 1.70296 2.80186 1.02178 3.22599C0.93181 3.28383 0.803285 3.3738 0.661906 3.48947C0.237772 3.81721 0 4.30561 0 4.83256C0 5.35952 0.237772 5.84149 0.661906 6.16923C0.790432 6.27205 0.906105 6.35559 0.989647 6.407C1.58086 6.77972 2.33274 7.18458 3.21314 7.61514V10.899C3.21314 11.6508 3.65013 12.3385 4.33131 12.6469C5.50732 13.1803 6.60621 13.6044 7.59586 13.9129C8.01999 14.0414 8.47626 14.1185 8.95823 14.1442H9.02249C9.51089 14.1185 9.96716 14.0414 10.3913 13.9129C11.3809 13.6109 12.4798 13.1803 13.6558 12.6469C14.337 12.3385 14.774 11.6508 14.774 10.899V7.61514C15.5195 7.24884 16.1621 6.90825 16.7019 6.58693V11.5737C16.7019 11.9272 16.9911 12.2164 17.3445 12.2164C17.698 12.2164 17.9871 11.9272 17.9871 11.5737V4.90968C17.9871 4.90968 17.9936 4.85827 17.9936 4.83256V4.81971H18Z" fill="white"/>
        </svg>
        <span class="floating-btn-text">
          <span>Revisa la bibliografía</span>
          <span>de tu carrera</span>
        </span>
      </button>
    </div>
    
    <!-- Breadcrumbs -->
    <div class="breadcrumbs-section">
      <div class="container">
        <div class="breadcrumbs">
          <a href="#" @click.prevent="navigateToHome" class="breadcrumb-link">
            <svg class="home-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_40000137_4037)">
                <path d="M7.56851 10.3306H10.438C11.1453 10.3306 11.7179 10.8896 11.7179 11.5834V15.4093C11.7179 15.5776 11.8795 15.7191 12.0816 15.7191H13.5096C14.3045 15.7191 14.6278 15.4227 14.8972 14.4461C14.9983 14.0756 15.0791 13.658 15.1936 12.8901L15.2677 12.3715C15.4631 11.0648 15.6988 9.44821 15.7258 8.3503V7.62959C15.7258 6.92908 15.362 6.25552 14.7625 5.83791L9.79812 2.49703C9.57583 2.36232 9.31986 2.3017 9.01001 2.28149H8.99654C8.70689 2.28149 8.43071 2.36232 8.18822 2.5105L3.23728 5.84464C2.64452 6.25552 2.28078 6.92908 2.28078 7.62959V8.37051C2.30772 9.44821 2.55021 11.0715 2.73882 12.3715L2.81292 12.8901C2.92069 13.6445 3.00152 14.0823 3.1093 14.4461C3.37874 15.4227 3.7088 15.7191 4.49691 15.7191H5.92493C6.12028 15.7191 6.28868 15.5776 6.28868 15.4093V11.5834C6.28868 10.8964 6.86123 10.3306 7.56851 10.3306ZM13.5029 17.0999H12.0749C11.1116 17.0999 10.3303 16.3388 10.3303 15.4093V11.7114H7.66955V15.4093C7.66955 16.3388 6.88818 17.0999 5.92493 17.0999H4.49691C2.63105 17.0999 2.05175 15.7932 1.77558 14.8165C1.65433 14.3854 1.56676 13.9005 1.44552 13.0855L1.37142 12.5736C1.17608 11.2332 0.926846 9.56272 0.899902 8.38398V7.62959C0.899902 6.47779 1.4792 5.37988 2.45591 4.70632L7.43379 1.35197C7.92552 1.04887 8.47113 0.88721 9.00327 0.900681C9.56909 0.900681 10.0676 1.04213 10.5391 1.33176L15.5372 4.69285C16.5206 5.37315 17.0999 6.47106 17.0999 7.62285V8.36377C17.073 9.55598 16.8237 11.2264 16.6217 12.5668L16.5476 13.0787C16.4263 13.9072 16.3387 14.3787 16.2175 14.8098C15.9481 15.7932 15.3688 17.0932 13.4962 17.0932H13.5029V17.0999Z" fill="#5C677B"/>
              </g>
              <defs>
                <clipPath id="clip0_40000137_4037">
                  <rect width="18" height="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            Inicio
          </a>
          <span class="breadcrumb-separator">
            <svg width="1" height="20" viewBox="0 0 1 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="0" x2="0.5" y2="20" stroke="#8B93A1" stroke-width="1"/>
            </svg>
          </span>
          <span class="breadcrumb-current">Bibliografía por escuela</span>
        </div>
      </div>
    </div>
    
    <!-- Filtros y Búsqueda -->
    <div class="filters-section">
      <div class="container">
        <div class="filters-row">
          <div class="filter-wrapper">
            <select v-model="selectedSchool" class="filter-dropdown school-dropdown">
              <option value="artes">Artes e Industrias Creativas</option>
              <option value="administracion">Administración y Gestión Empresarial</option>
              <option value="desarrollo">Desarrollo Social y Educación</option>
              <option value="estetica">Estética Integral</option>
            </select>
            <svg class="dropdown-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.99179 13.533C8.48879 13.533 7.98578 13.3464 7.5558 12.9651L1.14658 6.82359C0.830175 6.5153 0.813949 6.0123 1.12224 5.6959C1.43053 5.37949 1.93353 5.36327 2.24994 5.67156L8.63482 11.7887C8.87009 11.9996 9.1216 11.9996 9.38932 11.7644L15.7499 5.67156C16.0663 5.36327 16.5774 5.37949 16.8776 5.6959C17.1859 6.0123 17.1696 6.52341 16.8532 6.82359L10.4683 12.9407C10.0221 13.3383 9.5029 13.533 8.99179 13.533Z" fill="#024588"/>
            </svg>
          </div>
          <div class="filter-wrapper">
            <select v-model="selectedCareer" class="filter-dropdown career-dropdown">
              <option value="">Carrera</option>
              <option value="administracion-gastronomica">Administración en Empresas Gastronómicas</option>
              <option value="gastronomia-internacional">Gastronomía Internacional</option>
              <option value="tecnico-turismo">Técnico en Turismo</option>
            </select>
            <svg class="dropdown-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.99179 13.533C8.48879 13.533 7.98578 13.3464 7.5558 12.9651L1.14658 6.82359C0.830175 6.5153 0.813949 6.0123 1.12224 5.6959C1.43053 5.37949 1.93353 5.36327 2.24994 5.67156L8.63482 11.7887C8.87009 11.9996 9.1216 11.9996 9.38932 11.7644L15.7499 5.67156C16.0663 5.36327 16.5774 5.37949 16.8776 5.6959C17.1859 6.0123 17.1696 6.52341 16.8532 6.82359L10.4683 12.9407C10.0221 13.3383 9.5029 13.533 8.99179 13.533Z" fill="#024588"/>
            </svg>
          </div>
          <div class="search-wrapper">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Busca tu carrera (Ej: Diseño Gráfico)" 
              class="career-search"
            />
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.51308 8.95965C2.51308 5.40353 5.40307 2.51324 8.95881 2.51324C12.5146 2.51324 15.4045 5.40353 15.4045 8.95965C15.4045 12.5158 12.5146 15.4061 8.95881 15.4061C5.40307 15.4061 2.51308 12.5158 2.51308 8.95965ZM18.7711 17.7062L15.0868 14.0214C16.2216 12.6444 16.9101 10.8815 16.9101 8.95965C16.9101 4.57125 13.3392 1 8.95125 1C4.56331 1 1 4.57125 1 8.95965C1 13.348 4.57087 16.9193 8.95881 16.9193C10.8804 16.9193 12.6432 16.2308 14.0201 15.0958L17.7044 18.7806C17.8557 18.9319 18.0449 19 18.2416 19C18.4383 19 18.6274 18.9243 18.7787 18.7806C19.0738 18.4855 19.0738 18.0088 18.7787 17.7137H18.7711V17.7062Z" fill="#102A8A"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Grid de Carreras -->
    <div class="careers-grid-section">
      <div class="container">
        <div class="careers-grid">
          <div 
            v-for="career in paginatedCareers" 
            :key="career.id"
            class="career-card"
          >
            <div class="career-image">
              <div class="career-image-placeholder"></div>
            </div>
            <div class="career-content">
              <p class="career-category">{{ currentSchoolName }}</p>
              <h3 class="career-title">{{ career.name }}</h3>
              <a href="#" class="career-link">
                Ver bibliografía
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5019 10.0015L13.5177 3.75535C13.2161 3.44583 12.724 3.42995 12.4145 3.73155C12.1049 4.03314 12.0891 4.52521 12.3907 4.83474L17.9542 10.6444H1.85079C1.41428 10.6444 1.05713 11.0015 1.05713 11.438C1.05713 11.8745 1.41428 12.2317 1.85079 12.2317H17.9542L12.3907 18.0413C12.0891 18.3508 12.1049 18.8509 12.4145 19.1445C12.5653 19.2874 12.7637 19.3588 12.9542 19.3588C13.1605 19.3588 13.3669 19.2794 13.5177 19.1207L19.5257 12.8507C20.2717 12.0015 20.2717 10.8666 19.5019 10.0015Z" fill="#0065DC"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Functional Navigation -->
        <div class="svg-navigation" v-if="paginationPages.length > 0">
          <button 
            class="nav-btn nav-arrow-left"
            :disabled="careersCurrentPage === 1"
            @click="previousCareerPage"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8001 17.1285C11.5888 17.1285 11.3775 17.0472 11.223 16.8846L5.09441 10.4878C4.30598 9.59367 4.30598 8.43134 5.07002 7.56976L11.223 1.14851C11.5319 0.831509 12.0359 0.815253 12.3529 1.12412C12.6699 1.43299 12.6861 1.93694 12.3772 2.25394L6.24861 8.6508C6.03728 8.89465 6.03728 9.13849 6.27299 9.40672L12.3772 15.7792C12.6861 16.0962 12.6699 16.6083 12.3529 16.909C12.1984 17.0553 11.9952 17.1285 11.8001 17.1285Z" fill="#024588"/>
            </svg>
          </button>
          
          <button 
            v-for="(page, index) in paginationPages"
            :key="`page-${index}-${page}`"
            :class="['nav-btn', 'nav-page', { active: page === careersCurrentPage, ellipsis: page === '...' }]"
            @click="page !== '...' && goToCareerPage(page)"
            :disabled="page === '...'"
          >
            {{ page }}
          </button>
          
          <button 
            class="nav-btn nav-arrow-right"
            :disabled="careersCurrentPage === careersTotalPages"
            @click="nextCareerPage"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.19988 17.1138C5.99668 17.1138 5.8016 17.0407 5.64716 16.8944C5.33017 16.5855 5.31391 16.0816 5.62278 15.7646L11.7514 9.36769C11.9627 9.12385 11.9627 8.88 11.727 8.61177L5.62278 2.23929C5.31391 1.92229 5.33017 1.41022 5.64716 1.10947C5.96416 0.800604 6.47624 0.816861 6.77698 1.13386L12.9056 7.53072C13.694 8.41669 13.694 9.58715 12.93 10.4487L6.77698 16.87C6.62254 17.0325 6.41121 17.1138 6.19988 17.1138Z" fill="#024588"/>
            </svg>
          </button>
        </div>
              </div>
    </div>
    
    <!-- Preguntas Frecuentes -->
    <PreguntasFrecuentesSection />
    
    <!-- Footer -->
    <FooterSection />
  </div>
  
  <!-- Vista simple (actual) -->
  <section v-else id="bibliografia" class="bibliografia-section">
    <div class="container">
      <div class="section-header">
        <div class="title-bar"></div>
        <h2 class="section-title">Bibliografía por <br>escuela</h2>
      </div>
      <p class="section-description">
        Selecciona tu escuela y luego busca tu carrera para conocer la Bibliografía Básica de cada una.
      </p>
      <div class="schools-grid-wrapper" v-if="schools.length > 0">
        <div class="carousel-wrapper" ref="carouselWrapper">
          <div class="carousel-container">
          <!-- Desktop: cards individuales en grid -->
          <div 
              v-for="school in schools" 
            :key="school.id"
            class="school-card desktop-card"
          >
            <div :class="['card-accent', `accent-${school.color}`]"></div>
            <h3 class="card-title">{{ school.name }}</h3>
            <a href="#" class="card-link">
              Ver más
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5019 10.0015L13.5177 3.75535C13.2161 3.44583 12.724 3.42995 12.4145 3.73155C12.1049 4.03314 12.0891 4.52521 12.3907 4.83474L17.9542 10.6444H1.85079C1.41428 10.6444 1.05713 11.0015 1.05713 11.438C1.05713 11.8745 1.41428 12.2317 1.85079 12.2317H17.9542L12.3907 18.0413C12.0891 18.3508 12.1049 18.8509 12.4145 19.1445C12.5653 19.2874 12.7637 19.3588 12.9542 19.3588C13.1605 19.3588 13.3669 19.2794 13.5177 19.1207L19.5257 12.8507C20.2717 12.0015 20.2717 10.8666 19.5019 10.0015Z" fill="#0065DC"/>
              </svg>
            </a>
          </div>
          <!-- Mobile: cards agrupadas en pares (siempre) -->
          <template v-for="(school, index) in schools" :key="`mobile-${school.id}`">
            <div 
              v-if="index % 2 === 0"
              class="card-pair mobile-pair"
            >
              <div class="school-card">
                <div :class="['card-accent', `accent-${school.color}`]"></div>
                <h3 class="card-title">{{ school.name }}</h3>
                <a href="#" class="card-link">
                  Ver más
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5019 10.0015L13.5177 3.75535C13.2161 3.44583 12.724 3.42995 12.4145 3.73155C12.1049 4.03314 12.0891 4.52521 12.3907 4.83474L17.9542 10.6444H1.85079C1.41428 10.6444 1.05713 11.0015 1.05713 11.438C1.05713 11.8745 1.41428 12.2317 1.85079 12.2317H17.9542L12.3907 18.0413C12.0891 18.3508 12.1049 18.8509 12.4145 19.1445C12.5653 19.2874 12.7637 19.3588 12.9542 19.3588C13.1605 19.3588 13.3669 19.2794 13.5177 19.1207L19.5257 12.8507C20.2717 12.0015 20.2717 10.8666 19.5019 10.0015Z" fill="#0065DC"/>
                  </svg>
                </a>
              </div>
              <div 
                v-if="schools[index + 1]"
                class="school-card"
              >
                <div :class="['card-accent', `accent-${schools[index + 1].color}`]"></div>
                <h3 class="card-title">{{ schools[index + 1].name }}</h3>
                <a href="#" class="card-link">
                  Ver más
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5019 10.0015L13.5177 3.75535C13.2161 3.44583 12.724 3.42995 12.4145 3.73155C12.1049 4.03314 12.0891 4.52521 12.3907 4.83474L17.9542 10.6444H1.85079C1.41428 10.6444 1.05713 11.0015 1.05713 11.438C1.05713 11.8745 1.41428 12.2317 1.85079 12.2317H17.9542L12.3907 18.0413C12.0891 18.3508 12.1049 18.8509 12.4145 19.1445C12.5653 19.2874 12.7637 19.3588 12.9542 19.3588C13.1605 19.3588 13.3669 19.2794 13.5177 19.1207L19.5257 12.8507C20.2717 12.0015 20.2717 10.8666 19.5019 10.0015Z" fill="#0065DC"/>
                  </svg>
                </a>
              </div>
            </div>
          </template>
          </div>
        </div>
      </div>
      <!-- Paginación para desktop - Eliminada ya que todas las cards se muestran -->
      <!-- Navegación con flechas para móvil -->
      <div class="mobile-navigation" v-if="windowWidth <= 768 && schools.length > 1">
        <button 
          class="pagination-arrow"
          :disabled="isAtStart"
          @click="scrollLeft"
        >
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.11127 18.0301C7.87646 18.0301 7.64164 17.9398 7.47005 17.7592L0.660453 10.6516C-0.215582 9.65812 -0.215582 8.36664 0.63336 7.40932L7.47005 0.2746C7.81324 -0.0776207 8.37318 -0.0956822 8.7254 0.247507C9.07762 0.590696 9.09568 1.15064 8.75249 1.50286L1.9429 8.61048C1.70808 8.88142 1.70808 9.15236 1.96999 9.45039L8.75249 16.5309C9.09568 16.8832 9.07762 17.4521 8.7254 17.7863C8.55381 17.9488 8.32802 18.0301 8.11127 18.0301Z" fill="#D1D4DA"/>
          </svg>
        </button>
        <button 
          class="pagination-arrow"
          :disabled="isAtEnd"
          @click="scrollRight"
        >
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.888728 18.0301C0.662946 18.0301 0.446195 17.9488 0.2746 17.7863C-0.07762 17.4431 -0.0956828 16.8832 0.247506 16.5309L7.0571 9.4233C7.29192 9.15236 7.29192 8.88142 7.03001 8.58339L0.247506 1.50286C-0.0956828 1.15064 -0.07762 0.581664 0.2746 0.247506C0.626821 -0.0956827 1.19579 -0.0776201 1.52995 0.2746L8.33955 7.38223C9.21558 8.36664 9.21558 9.66715 8.36664 10.6245L1.52995 17.7592C1.35836 17.9398 1.12354 18.0301 0.888728 18.0301Z" fill="#D1D4DA"/>
          </svg>
        </button>
      </div>
      <!-- Botón "Ver todas las escuelas" solo en mobile -->
      <div class="view-all-button-wrapper" v-if="windowWidth <= 768">
        <button class="view-all-button">Ver todas las escuelas</button>
      </div>
    </div>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'
import heroBackground from '@/assets/images/hero-background.jpg'
import heroBackgroundMobile from '@/assets/images/b1b818e26d255f001e62b637fce22a3221cf95c6.jpg'
import PreguntasFrecuentesSection from './PreguntasFrecuentesSection.vue'
import FooterSection from './FooterSection.vue'

export default {
  name: 'BibliografiaSection',
  components: {
    PreguntasFrecuentesSection,
    FooterSection
  },
  data() {
      // Datos de ejemplo precargados - Solo las 7 cards principales
      const exampleSchools = [
        { id: 1, name: 'Administración y Gestión Empresarial', color: 'green' },
        { id: 2, name: 'Artes e Industrias Creativas', color: 'pink' },
        { id: 3, name: 'Desarrollo Social y Educación', color: 'purple' },
        { id: 4, name: 'Estética Integral', color: 'purple-light' },
        { id: 5, name: 'Gastronomía, Hotelería y Turismo', color: 'orange-accent' },
        { id: 6, name: 'Ingeniería, Energía y Tecnología', color: 'green-dark' },
        { id: 7, name: 'Salud y Deporte', color: 'cyan' },
      ]

    return {
      schools: exampleSchools, // Cargar datos de ejemplo inmediatamente
      currentPage: 1,
      currentIndex: 0,
      windowWidth: window.innerWidth,
      isAtStart: true,
      isAtEnd: false,
      isLibrosPorSede: false,
      isLibrosDigitales: false,
      showDetailedView: false,
      selectedSchool: 'artes',
      selectedCareer: '',
      searchQuery: '',
      heroBackground: heroBackground,
      heroBackgroundMobile: heroBackgroundMobile,
      careersCurrentPage: 1,
      careersPerPage: 9,
      careers: [
        { id: 1, name: 'Animación 3D', school: 'artes' },
        { id: 2, name: 'Diseño de Vestuario mención Alta Costura', school: 'artes' },
        { id: 3, name: 'Diseño Gráfico', school: 'artes' },
        { id: 4, name: 'Ingeniería en Animación 3D', school: 'artes' },
        { id: 5, name: 'Ingeniería en Sonido', school: 'artes' },
        { id: 6, name: 'Teatro', school: 'artes' },
        { id: 7, name: 'Técnico en Arte y Gestión Cultural', school: 'artes' },
        { id: 8, name: 'Técnico en Comunicación y Relaciones Públicas', school: 'artes' },
        { id: 9, name: 'Técnico en Diseño de Espacios y Equipamiento', school: 'artes' }
      ]
    }
  },
  computed: {
    currentHeroBackground() {
      return this.windowWidth <= 768 ? this.heroBackgroundMobile : this.heroBackground
    },
    filteredCareers() {
      return this.careers.filter(career => career.school === this.selectedSchool)
    },
    currentSchoolName() {
      const schoolMap = {
        'artes': 'Artes e Industrias Creativas',
        'administracion': 'Administración y Gestión Empresarial',
        'desarrollo': 'Desarrollo Social y Educación',
        'estetica': 'Estética Integral'
      }
      return schoolMap[this.selectedSchool] || 'Artes e Industrias Creativas'
    },
    displayedCareers() {
      let filtered = this.filteredCareers
      
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(career => 
          career.name.toLowerCase().includes(query)
        )
      }
      
      if (this.selectedCareer) {
        filtered = filtered.filter(career => career.id === parseInt(this.selectedCareer))
      }
      
      return filtered
    },
    currentCareersPerPage() {
      return this.windowWidth <= 768 ? 3 : 9
    },
    paginatedCareers() {
      const start = (this.careersCurrentPage - 1) * this.currentCareersPerPage
      const end = start + this.currentCareersPerPage
      return this.displayedCareers.slice(start, end)
    },
    careersTotalPages() {
      return Math.ceil(this.displayedCareers.length / this.currentCareersPerPage)
    },
    paginationPages() {
      const total = this.careersTotalPages
      const current = this.careersCurrentPage
      const pages = []
      
      if (total <= 0) {
        return []
      }
      
      if (total === 1) {
        // Si hay solo 1 página, mostrar solo esa página
        pages.push(1)
      } else if (total <= 3) {
        // Si hay 3 o menos páginas, mostrar todas
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // Siempre mostrar página 1
        pages.push(1)
        
        // Si la página actual es mayor que 2, agregar ellipsis
        if (current > 2) {
          pages.push('...')
        }
        
        // Mostrar página actual si no es la primera ni la última
        if (current !== 1 && current !== total) {
          pages.push(current)
        }
        
        // Si la página actual es menor que total-1, agregar ellipsis
        if (current < total - 1) {
          pages.push('...')
        }
        
        // Siempre mostrar última página
        pages.push(total)
      }
      
      return pages
    },
    carouselTransform() {
      if (this.schools.length === 0) return 0
      
      const isMobile = this.windowWidth <= 768
      const itemsPerView = 4 // Mostrar 4 cards por vista en desktop
      
      if (isMobile) {
        return 0 // En mobile no usamos transform
      } else {
        // En desktop: avanzar de 1 en 1 elemento
        const containerWidth = this.$refs.carouselWrapper ? this.$refs.carouselWrapper.clientWidth : this.windowWidth
        if (containerWidth > 0) {
          // Calcular el ancho de una card incluyendo el gap
          const gapSize = 24
          const totalGaps = (itemsPerView - 1) * gapSize // Gaps entre las cards visibles
          const cardWidth = (containerWidth - totalGaps) / itemsPerView
          // Avanzar 1 card + 1 gap
          const slideMove = cardWidth + gapSize
          return (this.currentIndex * slideMove / containerWidth) * 100
        }
        // Fallback si no hay ancho disponible
        const cardWidthPercent = 100 / itemsPerView
        const gapSize = 24
        const gapPercent = (gapSize / this.windowWidth) * 100
        // Avanzar 1 elemento: 1 card + 1 gap
        const slideMove = cardWidthPercent + gapPercent
        return this.currentIndex * slideMove
      }
    },
    totalPages() {
      if (this.windowWidth <= 768) {
        return 1
      }
      // Desktop: siempre avanzar de 1 en 1
      const itemsPerView = 4 // Mostrar 4 cards por vista
      const totalItems = this.schools.length
      
      if (totalItems <= itemsPerView) {
        return 1
      }
      
      // Calcular cuántos slides necesitamos avanzando de 1 en 1
      const remainingAfterFirst = totalItems - itemsPerView
      return Math.ceil(remainingAfterFirst / 1) + 1
    }
  },
  async mounted() {
    await this.loadSchools()
    this.checkLibrosPorSede()
    // Verificar vista detallada inmediatamente
    this.checkDetailedView()
    // Verificar después de un delay para asegurar que se detecte el flag
    setTimeout(() => {
      this.checkDetailedView()
    }, 200)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('hashchange', this.checkDetailedView)
    window.addEventListener('bibliografia-navigated', this.checkDetailedView)
    this.$nextTick(() => {
      if (this.$refs.carouselWrapper) {
        if (this.windowWidth <= 768) {
          this.$refs.carouselWrapper.addEventListener('scroll', this.handleScroll)
        }
        this.updateScrollButtons()
      }
    })
    // Observar cambios en el HeroSection
    this.observeHeroSection()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('hashchange', this.checkDetailedView)
    window.removeEventListener('bibliografia-navigated', this.checkDetailedView)
    if (this.$refs.carouselWrapper) {
      this.$refs.carouselWrapper.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    async loadSchools() {
      // Intentar cargar desde Strapi en segundo plano y actualizar si está disponible
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 2000)
        )

        const responsePromise = strapiService.getCollection('escuelas', {
          populate: '*'
        })
        
        const response = await Promise.race([responsePromise, timeoutPromise])
        
        if (response && response.data && response.data.length > 0) {
          this.schools = response.data
          this.$nextTick(() => {
            this.updateScrollButtons()
          })
        }
      } catch (error) {
        // Si falla, mantener los datos de ejemplo que ya están cargados
      }
    },
    previousPage() {
      if (this.windowWidth <= 768) {
        this.scrollLeft()
      } else {
        // Desktop: siempre avanzar de 1 en 1
        if (this.currentIndex > 0) {
          this.currentIndex--
          this.currentPage = this.currentIndex + 1
        }
      }
    },
    nextPage() {
      if (this.windowWidth <= 768) {
        this.scrollRight()
      } else {
        // Desktop: siempre avanzar de 1 en 1
        if (this.currentIndex < this.totalPages - 1) {
          this.currentIndex++
          this.currentPage = this.currentIndex + 1
        }
      }
    },
    goToPage(page) {
      if (this.windowWidth <= 768) {
        // En mobile, no hay paginación por dots
        return
      }
      this.currentIndex = page - 1
      this.currentPage = page
    },
    handleResize() {
      const wasMobile = this.windowWidth <= 768
      this.windowWidth = window.innerWidth
      const isMobile = this.windowWidth <= 768
      
      // Si cambió de desktop a mobile o viceversa, resetear a página 1
      if (wasMobile !== isMobile) {
        this.careersCurrentPage = 1
      }
      
      this.$nextTick(() => {
        if (this.$refs.carouselWrapper) {
          if (this.windowWidth <= 768) {
            this.$refs.carouselWrapper.addEventListener('scroll', this.handleScroll)
          }
          this.updateScrollButtons()
        }
      })
    },
    scrollLeft() {
      if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
        // Siempre scroll por card-pair en mobile
        const cardPair = this.$refs.carouselWrapper.querySelector('.card-pair.mobile-pair')
        if (cardPair) {
          const cardPairWidth = cardPair.offsetWidth
          const gap = 16
          const scrollAmount = cardPairWidth + gap
          this.$refs.carouselWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    },
    scrollRight() {
      if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
        // Siempre scroll por card-pair en mobile
        const cardPair = this.$refs.carouselWrapper.querySelector('.card-pair.mobile-pair')
        if (cardPair) {
          const cardPairWidth = cardPair.offsetWidth
          const gap = 16
          const scrollAmount = cardPairWidth + gap
          this.$refs.carouselWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    },
    handleScroll() {
      this.updateScrollButtons()
    },
    updateScrollButtons() {
      if (this.windowWidth <= 768) {
        if (!this.$refs.carouselWrapper) return
        const wrapper = this.$refs.carouselWrapper
        const scrollLeft = wrapper.scrollLeft
        const scrollWidth = wrapper.scrollWidth
        const clientWidth = wrapper.clientWidth
        
        this.isAtStart = scrollLeft <= 0
        this.isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
      } else {
        // En desktop, actualizar estado de botones basado en currentIndex
        this.isAtStart = this.currentIndex === 0
        this.isAtEnd = this.currentIndex >= this.totalPages - 1
      }
    },
    checkLibrosPorSede() {
      const activeButton = document.querySelector('.hero .tab.active')
      if (activeButton) {
        const buttonText = activeButton.textContent.trim()
        const wasLibrosDigitales = this.isLibrosDigitales
        this.isLibrosPorSede = buttonText === 'Libros por sede'
        this.isLibrosDigitales = buttonText === 'Libros digitales'
        
        // Si se activa Libros digitales, resetear a la página 1
        if (this.isLibrosDigitales && !wasLibrosDigitales) {
          this.currentPage = 1
        }
      } else {
        this.isLibrosPorSede = false
        this.isLibrosDigitales = false
      }
    },
    checkDetailedView() {
      // Verificar si se hizo clic desde el header
      const fromHeader = sessionStorage.getItem('bibliografiaFromHeader') === 'true'
      const hash = window.location.hash
      
      if (fromHeader) {
        // Si viene del header, mostrar vista detallada
        this.showDetailedView = true
        // Resetear paginación de carreras
        this.careersCurrentPage = 1
        // Notificar cambio a HomePage inmediatamente
        window.dispatchEvent(new CustomEvent('bibliografia-detailed-view-changed', {
          detail: { show: true }
        }))
        // Remover el flag después de un delay más largo para evitar que se ejecute múltiples veces
        setTimeout(() => {
          sessionStorage.removeItem('bibliografiaFromHeader')
        }, 1000)
        // Scroll al inicio de la página para mostrar el hero después de que se renderice
        this.$nextTick(() => {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }, 100)
        })
      } else if (hash === '#bibliografia' && !fromHeader && !this.showDetailedView) {
        // Si hay hash pero no viene del header Y la vista detallada NO está activa, mantener vista simple
        // Solo ocultar si NO está ya mostrando la vista detallada
        this.showDetailedView = false
        window.dispatchEvent(new CustomEvent('bibliografia-detailed-view-changed', {
          detail: { show: false }
        }))
      } else if (hash !== '#bibliografia' && this.showDetailedView) {
        // Si no hay hash Y la vista detallada está activa, ocultarla
        this.showDetailedView = false
        window.dispatchEvent(new CustomEvent('bibliografia-detailed-view-changed', {
          detail: { show: false }
        }))
      }
      // Si showDetailedView ya está true y hash es #bibliografia, mantenerla visible
    },
    previousCareerPage() {
      if (this.careersCurrentPage > 1) {
        this.careersCurrentPage--
      }
    },
    nextCareerPage() {
      if (this.careersCurrentPage < this.careersTotalPages) {
        this.careersCurrentPage++
      }
    },
    goToCareerPage(page) {
      this.careersCurrentPage = page
    },
    navigateToHome() {
      this.showDetailedView = false
      // Notificar cambio a HomePage
      window.dispatchEvent(new CustomEvent('bibliografia-detailed-view-changed', {
        detail: { show: false }
      }))
      window.location.hash = ''
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    observeHeroSection() {
      // Observar cambios en los tabs del HeroSection
      const observer = new MutationObserver(() => {
        this.checkLibrosPorSede()
      })
      
      const heroSection = document.querySelector('.hero .widget-tabs')
      if (heroSection) {
        observer.observe(heroSection, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class']
        })
      }
      
      // También escuchar clicks en los tabs
      const tabs = document.querySelectorAll('.hero .tab')
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          setTimeout(() => {
            this.checkLibrosPorSede()
          }, 100)
        })
      })
    }
  }
}
</script>

<style scoped>
.bibliografia-section {
  padding: 60px 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.title-bar {
  width: 6px;
  height: 80px;
  background-color: var(--accent-red);
}

.section-title {
  font-size: 36px;
  color: #024588;
  margin: 0;
}

@media (min-width: 769px) {
  .section-title {
    white-space: nowrap;
    padding-left: 8px;
  }
  
  .section-title br {
    display: none;
  }
}

.section-description {
  color: #4B4D53;
  margin-bottom: 40px;
  font-size: 18px;
  font-family: Verdana, sans-serif;
}

.schools-grid-wrapper {
  margin-bottom: 40px;
  overflow: visible;
  padding-top: 4px;
}

.carousel-wrapper {
  width: 100%;
  position: relative;
}

@media (min-width: 769px) {
  .carousel-wrapper {
    overflow: hidden;
  }
}

.carousel-container {
  display: flex;
  gap: 24px;
}

@media (min-width: 769px) {
  .carousel-container {
    transform: none !important;
  }
}

@media (max-width: 768px) {
  .carousel-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .carousel-wrapper::-webkit-scrollbar {
    display: none;
  }
  
  .carousel-container {
    transform: none !important;
    gap: 16px;
    padding-right: 20px;
  }
  
  /* Ocultar cards de desktop en móvil */
  .school-card.desktop-card {
    display: none;
  }
}


.school-card {
  background: var(--white);
  border-radius: 7px;
  padding: 32px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border: 2px solid var(--border-gray);
  min-height: 180px;
}


.school-card:hover {
  transform: translateY(-4px);
}

.card-accent {
  position: absolute;
  top: 0;
  left: 33.47px;
  width: 151.5px;
  height: 7.05px;
}

.accent-green {
  background-color: #4caf50;
}

.accent-purple {
  background-color: #9c27b0;
}

.accent-purple-light {
  background-color: #ba68c8;
}

.accent-pink {
  background-color: #e91e63;
}

.accent-blue {
  background-color: #2196f3;
}

.accent-cyan {
  background-color: #00bcd4;
}

.accent-red-accent {
  background-color: #f44336;
}

.accent-orange-accent {
  background-color: #ff9800;
}

.accent-green-dark {
  background-color: #388e3c;
}

.card-title {
  font-size: 18px;
  color: #182844;
  margin-bottom: 20px;
  margin-top: 0;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  flex: 1;
  min-height: 60px;
  display: flex;
  align-items: flex-start;
}

.card-link {
  color: #0065DC;
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
  gap: 8px;
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  padding-right: 20px;
}

.card-link svg {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.card-link:hover {
  text-decoration: underline;
}

.card-link:hover svg {
  transform: translateX(4px);
}

.pagination {
  display: none;
}

@media (max-width: 768px) {
  .pagination {
    display: none;
  }
}

.pagination-arrow {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-gray);
  background: var(--white);
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  padding: 0;
}

.pagination-arrow:hover:not(:disabled),
.pagination-arrow:active:not(:disabled) {
  background: var(--primary-blue);
  color: var(--white);
  border-color: var(--primary-blue);
}

.pagination-arrow:disabled {
  opacity: 1;
  background: #F5F5F5;
  border-color: #E0E0E0;
  color: #8B93A1;
  cursor: not-allowed;
}

.pagination-arrow:not(:disabled) {
  background: white;
  border-color: #E0E0E0;
}

.pagination-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-gray);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--primary-blue);
  width: 12px;
  height: 12px;
}

@media (min-width: 769px) {
  .bibliografia-section .container {
    max-width: 1200px;
  }
  
  .schools-grid-wrapper {
    position: relative;
    overflow: visible;
    padding-top: 4px;
    padding-right: 8px;
  }
  
  .carousel-wrapper {
    overflow: visible;
    width: 100%;
  }
  
  .carousel-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  
  .school-card.desktop-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 140px;
    padding: 24px 32px;
  }
  
  .school-card.desktop-card .card-title {
    min-height: 50px;
    margin-bottom: 16px;
  }
  
  /* Ocultar todas las cards de mobile en desktop */
  .card-pair.mobile-pair {
    display: none;
  }
  
  .school-card.mobile-single-card {
    display: none;
  }
  
  /* Estilos para servicios-content cuando se mueve dinámicamente desde NovedadesSection */
  .bibliografia-section .servicios-content {
    margin-top: 60px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
    line-height: 1.2;
  }
  
  .section-description {
    font-size: 16px;
    line-height: 1.3;
    max-width: 100%;
    word-wrap: break-word;
    hyphens: auto;
  }
  
  /* Ocultar cards individuales de desktop en mobile */
  .school-card.desktop-card {
    display: none;
  }
  
  /* Mostrar card-pair en mobile cuando NO está Libros por sede */
  .card-pair.mobile-pair {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: calc(100% - 8px);
    width: calc(100% - 8px);
    flex-shrink: 0;
    scroll-snap-align: start;
  }
  
  .card-pair .school-card {
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
  }
  
  /* Ocultar cards individuales en mobile - siempre usar pares */
  .school-card.mobile-single-card {
    display: none;
  }
  
  .card-title {
    flex: 1;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
    font-size: 21px;
  }
  
  .card-link {
    margin-top: auto;
    align-self: flex-end;
  }
  
  .pagination {
    display: none;
  }
  
  .mobile-navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
  }
  
  .mobile-navigation .pagination-arrow {
    width: 48px;
    height: 48px;
  }
  
  .view-all-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    padding: 0 24px;
  }
  
  .view-all-button {
    width: 100%;
    max-width: 100%;
    padding: 14px 24px;
    background: var(--white);
    border: 1px solid #024588;
    border-radius: 8px;
    color: #024588;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }
  
  .view-all-button:hover {
    background: var(--primary-blue);
    color: var(--white);
  }
  
  .view-all-button:active {
    transform: scale(0.98);
  }
}

/* Ocultar botón en desktop */
@media (min-width: 769px) {
  .view-all-button-wrapper {
    display: none;
  }
}

/* Estilos para la vista detallada de Bibliografía */
.bibliografia-detailed-view {
  width: 100%;
}

/* Hero Section */
.bibliografia-hero {
  position: relative;
  width: 100%;
  min-height: 300px;
  background-size: cover;
  background-position: center 40%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 0;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #182844A6;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  color: white;
}

.hero-subtitle {
  font-size: 18px;
  margin: 0 0 16px 0;
  font-weight: 400;
  font-family: 'Ubuntu', sans-serif;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 32px 0;
  font-family: 'Ubuntu', sans-serif;
  line-height: 1.2;
}

.floating-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 12px 20px;
  background: var(--accent-red, #CE1B1B);
  color: var(--white, white);
  border: none;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 10;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  font-size: 13px;
}

.floating-btn-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  text-align: left;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  font-size: 13px;
}

.floating-btn-text span {
  display: block;
}

.floating-btn:hover {
  background: #880000;
}

/* Breadcrumbs */
.breadcrumbs-section {
  background: white;
  padding: 20px 0;
}

.breadcrumbs-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #8B93A1;
  text-decoration: none;
  font-weight: 400;
  font-family: 'Ubuntu', sans-serif;
  transition: color 0.3s;
}

.breadcrumb-link:hover {
  color: #666;
}

.home-icon {
  width: 18px;
  height: 18px;
}

.home-icon path {
  fill: #5C677B;
}

.breadcrumb-separator {
  color: #8B93A1;
}

.breadcrumb-current {
  color: #4B4D53;
  font-weight: 700;
}

/* Filtros Section */
.filters-section {
  background: white;
  padding: 20px 0 24px;
}

.filters-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.filters-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-wrapper {
  position: relative;
  display: inline-block;
}

.filter-wrapper .dropdown-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 300px;
  max-width: 100%;
}

.career-search {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  background: transparent;
  font-size: 14px;
  font-family: 'Ubuntu', sans-serif;
  color: #333;
}

.career-search:focus {
  outline: none;
  border-color: #024588;
}

.search-wrapper .search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.filter-wrapper {
  position: relative;
  display: inline-block;
}

.filter-wrapper .dropdown-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.filter-dropdown {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 12px 40px 12px 16px;
  border: 1px solid #024588;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
  color: #024588;
  cursor: pointer;
  min-width: 250px;
  transition: border-color 0.3s;
}

.filter-dropdown:focus {
  outline: none;
  border-color: #024588;
}

.school-dropdown {
  min-width: 236px;
  max-width: 255px;
  width: 242px;
}

.career-dropdown {
  min-width: 106px;
  width: 107px;
}

.filter-wrapper:has(.career-dropdown) .dropdown-arrow {
  right: 12px;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  margin-left: auto;
}

.career-search {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #024588;
  border-radius: 6px;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
  color: #024588;
}

.career-search:focus {
  outline: none;
  border-color: #024588;
  box-shadow: 0 0 0 3px rgba(2, 69, 136, 0.1);
}

.search-wrapper .search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* Careers Grid Section */
.careers-grid-section {
  padding: 40px 0 80px;
  background: white;
}

.careers-grid-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.careers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.svg-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 40px 0;
  width: 100%;
}

.nav-btn {
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
  transition: all 0.3s;
  padding: 0;
}

.nav-arrow-left,
.nav-arrow-right {
  width: 50px;
  height: 50px;
  background: #F0F1F2;
  border-radius: 2px;
}

.nav-arrow-left:disabled,
.nav-arrow-right:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow-left:hover:not(:disabled),
.nav-arrow-right:hover:not(:disabled) {
  background: #E0E0E0;
}

.nav-page {
  width: 48px;
  height: 52px;
  background: #F0F1F2;
  border-radius: 2px;
  color: #024588;
  font-size: 16px;
}

.nav-page.ellipsis {
  width: 53px;
  cursor: default;
  background: #F0F1F2;
}

.nav-page.active {
  background: #4B92E5;
  color: white;
  border-radius: 4px;
}

.nav-page:hover:not(.ellipsis):not(.active) {
  background: #E0E0E0;
}

.nav-btn svg {
  display: block;
}

.careers-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
}

.careers-pagination .pagination-arrow {
  width: 40px;
  height: 40px;
  border: 1px solid #E0E0E0;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.careers-pagination .pagination-arrow:hover:not(:disabled) {
  border-color: #024588;
  background: #F0F4F8;
}

.careers-pagination .pagination-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.careers-pagination .pagination-arrow:disabled svg path {
  fill: #8B93A1;
}

.pagination-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pagination-dot {
  min-width: 40px;
  height: 40px;
  border: 1px solid #E0E0E0;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-dot:hover {
  border-color: #024588;
  color: #024588;
}

.pagination-dot.active {
  background: #024588;
  border-color: #024588;
  color: white;
}

.career-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #E0E0E0;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  min-height: 380px;
}

.career-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.career-image {
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  position: relative;
  min-height: 0;
}

.career-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
}

.career-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  width: 40%;
  height: 7px;
  background: #DB379C;
  z-index: 1;
}

.career-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.career-image-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%, transparent 100%),
    radial-gradient(circle at center, rgba(184, 134, 11, 0.3) 0%, transparent 70%);
  background-size: 100% 100%, 60% 60%;
  background-position: center, center;
}

.career-image-placeholder::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(184, 134, 11, 0.8) 0%, rgba(184, 134, 11, 0.4) 50%, transparent 70%);
  border-radius: 50%;
  box-shadow: 0 0 40px rgba(184, 134, 11, 0.6);
}

.career-category {
  padding: 20px 20px 4px;
  font-size: 14px;
  font-weight: 500;
  color: #024588;
  margin: 0;
  font-family: 'Ubuntu', sans-serif;
}

.career-title {
  padding: 16px 20px 16px;
  font-size: 20px;
  font-weight: 700;
  color: #024588;
  margin: 0;
  font-family: 'Ubuntu', sans-serif;
  line-height: 1.3;
}

.career-link {
  color: #0065DC;
  text-decoration: none;
  font-weight: 700;
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 20px 20px;
  margin-top: auto;
  margin-left: auto;
  padding-top: 8px;
  align-self: flex-end;
}

.career-link:hover {
  text-decoration: underline;
}

.career-link svg {
  transition: transform 0.3s ease;
}

.career-link svg path {
  fill: #0065DC;
}

.career-link:hover svg {
  transform: translateX(4px);
}

@media (min-width: 769px) and (max-width: 1024px) {
  .careers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
}

@media (max-width: 768px) {
  .bibliografia-hero {
    min-height: 300px;
    padding: 100px 20px 40px;
    align-items: flex-start;
    justify-content: flex-start;
  }
  
  .hero-content {
    padding: 20px 20px 0;
  }
  
  .hero-subtitle {
    font-size: 14px;
    margin-bottom: 12px;
    text-align: center;
    white-space: nowrap;
  }
  
  .hero-title {
    font-size: 28px;
    margin-bottom: 0;
    text-align: center;
    white-space: nowrap;
  }
  
  .floating-btn {
    top: 20px;
    right: 0;
    transform: none;
    border-radius: 4px 0 0 4px;
  }
  
  .filters-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .filter-wrapper,
  .search-wrapper {
    width: 100%;
  }
  
  .filter-dropdown {
    width: 100%;
    min-width: 100%;
    background: #F4F7FF;
  }
  
  .career-search {
    width: 100%;
  }
  
  .careers-grid {
    grid-template-columns: 1fr;
  }
}
</style>


