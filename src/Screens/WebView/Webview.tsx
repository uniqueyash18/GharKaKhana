import React, { FC } from 'react';
import WebView from 'react-native-webview';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
interface propTypes {
  route?: {
    params?: {
      url: number;
      heading:string
    };
  };
  params?: object;
}
const Webview: FC<propTypes> = ({route}: propTypes) => {
  var url = route?.params?.url;
  var heading = route?.params?.heading;


  return (
   <WrapperContainer>
      <Header isLeft={true} cetnerTitle={heading}/>
      <WebView 
      showsVerticalScrollIndicator={false}
       source={{uri:url}as any} style={{flex: 1, backgroundColor:'transparent'}} />
    </WrapperContainer>
  );
};

export default Webview;
