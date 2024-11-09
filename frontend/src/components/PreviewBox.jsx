import ConvertBox from './ConvertBox';

export default function PreviewBox(props) {
  const { isLoading, data, chooseFormat } = props;
  // if (isLoading) {
  //   return <div>
  //       Error...
  //   </div>;
  // }
  if (!data) {
    return <></>;
  }
  return <ConvertBox data={data} chooseFormat={chooseFormat} />;
}
