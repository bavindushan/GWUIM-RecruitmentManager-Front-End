<!-- Navbar (Fixed) -->
        <nav class="navbar navbar-expand-lg fixed-top" :style="{ backgroundColor: '#660B05' }">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <img src="@/assets/logo_s.png" alt="Logo" height="40" class="me-3" />
                    <span class="text-white fw-bold">GWUIM Recruitment System</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link text-white d-flex align-items-center" @click="goToDashboard">
                                <i class="bi bi-house-door me-2"></i> Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white d-flex align-items-center" @click="goToApplications">
                                <i class="bi bi-file-earmark-text me-2"></i> My Applications
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white d-flex align-items-center" @click="goToSettings">
                                <i class="bi bi-gear me-2"></i> Settings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-warning fw-bold d-flex align-items-center" @click="logout">
                                <i class="bi bi-box-arrow-right me-2"></i> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>