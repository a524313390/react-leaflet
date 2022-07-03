import { PickerLocale } from 'antd/es/date-picker/generatePicker';
class LocalHelper {
    getDefinedChineseLocal() {
        let definedChineseLocal: PickerLocale = {
            lang: {
                locale: 'zh_CN',
                placeholder: '请选择日期',
                rangePlaceholder: ['Start date', 'End date'],
                today: 'Today',
                now: 'Now',
                backToToday: 'Back to today',
                ok: 'Ok',
                clear: 'Clear',
                month: 'Month',
                year: 'Year',
                timeSelect: 'Select time',
                dateSelect: 'Select date',
                monthSelect: 'Choose a month',
                yearSelect: 'Choose a year',
                decadeSelect: 'Choose a decade',
                yearFormat: 'YYYY年',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D',
                dateTimeFormat: 'M/D/YYYY HH:mm:ss',
                monthFormat: 'M月',
                monthBeforeYear: true,
                previousMonth: 'Previous month (PageUp)',
                nextMonth: 'Next month (PageDown)',
                previousYear: 'Last year (Control + left)',
                nextYear: 'Next year (Control + right)',
                previousDecade: 'Last decade',
                nextDecade: 'Next decade',
                previousCentury: 'Last century',
                nextCentury: 'Next century',
            },
            timePickerLocale: {
                placeholder: 'Select time',
            },
            dateFormat: 'YYYY-MM-DD',
            dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
            weekFormat: 'YYYY-wo',
            monthFormat: 'YYYY-MM',
        };
        return definedChineseLocal;
    }
}
export const LocalFormat = new LocalHelper();