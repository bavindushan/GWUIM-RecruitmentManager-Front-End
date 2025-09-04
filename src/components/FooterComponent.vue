<template>
    <footer class="footer bg-dark text-white py-4 mt-5 shadow-lg">
        <div class="container text-center">
            <div class="row">
                <div class="col-md-6 mb-2 mb-md-0">
                    <p class="mb-0">© 2025 GWUIM Recruitment System. All rights reserved.</p>
                </div>
                <div class="col-md-6">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item"><a href="#" class="text-white text-decoration-none">Privacy
                                Policy</a></li>
                        <li class="list-inline-item"><a href="#" class="text-white text-decoration-none">Terms of
                                Service</a></li>
                        <li class="list-inline-item"><a href="#" class="text-white text-decoration-none">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent",
};
</script>

<style scoped>
.footer a:hover {
    text-decoration: underline;
    color: #ffc107;
    /* Bootstrap warning color */
}
</style>
