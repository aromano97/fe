import { Result } from "antd";
import '../common-style/CommonStyle.css';

type ErrorPageProps = {
    title: string;
    subTitle: string;
}
export const ErrorPage: React.FC<ErrorPageProps> = ({ title, subTitle }) =>
    <div className="full-page">
        <Result
            status="error"
            title={title}
            subTitle={subTitle}
        />
    </div>


