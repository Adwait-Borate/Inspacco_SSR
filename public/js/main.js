document.addEventListener('DOMContentLoaded', function() {
    const hiLang = document.getElementById('hi-lang');
    const enLang = document.getElementById('en-lang');
    const sitePhotosText = document.getElementById('site-photos-text');
    const surveyReportText = document.getElementById('survey-report-text');
    const submitButton = document.getElementById('submit-button');

    const texts = {
        en: {
            sitePhotos: 'Before starting work, please upload <br> <b>site photos</b>',
            surveyReport: 'After survey completion, please upload <b>survey / visit report</b>',
            submit: 'Submit',
        },
        hi: {
            sitePhotos: 'काम शुरू करने से पहले कृपया <b>साइट की तस्वीरें</b> अपलोड करें',
            surveyReport: 'विज़िट पूरा होने के बाद कृपया <b>सर्वेक्षण / विज़िट रिपोर्ट</b> अपलोड करें',
            submit: 'जमा करें',
        },
    };

    function setLanguage(lang) {
        sitePhotosText.innerHTML = texts[lang].sitePhotos;
        surveyReportText.innerHTML = texts[lang].surveyReport;
        submitButton.textContent = texts[lang].submit;

        hiLang.classList.toggle('active', lang === 'hi');
        enLang.classList.toggle('active', lang === 'en');
    }

    hiLang.addEventListener('click', () => setLanguage('hi'));
    enLang.addEventListener('click', () => setLanguage('en'));
});