import React from 'react'
import '../styles/footer.css'
const Footer = () => {
    return (
        <footer className="footer-container">
            
            <div className="container-img">
            <img className="footer-img1" src = "https://qph.cf2.quoracdn.net/main-qimg-ef620cd8f6d1d9b1c5d7343e3dcb92b3-lq"/>
            <img className="footer-img1" src ="https://images.herzindagi.info/image/2021/Nov/langar-at-golden-temple.jpg"/>
            </div>
            <h4 className="copyright-text">ⒸEkam Web Technologies {new Date().getFullYear()}</h4>
        </footer>
    )
}

export default Footer
