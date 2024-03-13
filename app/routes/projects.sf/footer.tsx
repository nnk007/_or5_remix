export default function Footer({onContact:handleContact}:{onContact:()=>any}) {
    return (
        <footer className="flex flex-col items-center justify-center py-14">
            <div className="contact-form gap-14 flex flex-col text-center">
                <div className="contact-form-head text-3xl sm:text-4xl font-semibold leading-tight">
                    <div>Маєте сумніви?</div>
                    <div>Ми готові відповісти!</div>
                </div>
                <div className="form">
                    {/* <input type="text" placeholder="ІМ'Я" className="form-input">
                        <input type="tel" placeholder="НОМЕР ТЕЛЕФОНУ" className="form-input"> */}
                            <div className="form-button w-full sm:w-auto">
                                <button className="bg-[#988cc4] w-11/12 sm:w-auto sm:px-40 py-4 text-xl sm:text-2xl font-medium text-white rounded-md" onClick={e=>handleContact()}>КОНСУЛЬТАЦІЯ</button>
                            </div>
                            <div className="form-request-status hidden">
                                Заявка отримана ✅
                            </div>
                        </div>

                        <div className="extra text-2xl sm:text-3xl font-light leading-normal sm:px-0 px-2">
                            <p>Інвертор SUG POWER SGPC 2000</p>
                            <p>Правильний вибір під час блекауту</p>
                        </div>
                        <div id="footer-phone-numbers" className="font-semibold text-2xl leading-relaxed">
                            <div><a href="tel:+381234567890">+38 123 456 78 90</a></div>
                            <div><a href="tel:+381234567890">+38 123 456 78 91</a></div>
                            <div><a href="tel:+381234567890">+38 123 456 78 92</a></div>
                        </div>
                </div>
        </footer>
    )
}