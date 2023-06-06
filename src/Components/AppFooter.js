import "./Footer.css"
export function AppFooter() {
    
    return (
        <div className="app-footer">
        <div className="footer-description">
          <h3>Book-Shala</h3>
          <p className="app-description">
            Fill your house with stacks of books, in all the crannies and all the nooks.
          </p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>© 2022 Pustaka</p>
          </div>
          <div className="footer-links">
          <div>
          <h4>Connect</h4>
          </div>
          <div className="connect-logo">
                <p><a href="https://github.com/gunjal-prajakt26"><i class="bi bi-github"></i></a></p>
                <p><a href="https://www.linkedin.com/in/prajakt-gunjal-2a7039202"><i class="bi bi-linkedin"></i></a></p>
                <p><a href="https://twitter.com/gunjal_prajakt"><i class="bi bi-twitter"></i></a></p>
                </div>
          </div>
        </div>
    )
}