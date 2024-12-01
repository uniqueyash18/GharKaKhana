import React, { FC } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View } from 'react-native';
import colors from '../styles/colors';
interface PropTypes{
    width?:number,
    height? :number,
    backgroundColor? :string,
    foregroundColor? :string,
    rectWidth? :number,
    rectHeight? :number,
    viewStyles? :object,
    x? : number,
    y? : number,
    rx? : number,
    ry? : number,

}
const HomeLoader:FC<PropTypes> = ({
  width = 20,
  height = 20,
  backgroundColor = colors.greyNew,
  foregroundColor = '#DFDFDF',
  rectWidth = 20,
  rectHeight = 20,
  viewStyles = {},
  x = 0,
  y = 0,
  rx = 5,
  ry = 5,
}:PropTypes) => {
  return (
    <View style={{...viewStyles}}>
      <ContentLoader
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
        width={width}
        height={height}>
        <Rect
          x={x}
          y={y}
          rx={rx}
          ry={ry}
          width={rectWidth}
          height={rectHeight}
        />
      </ContentLoader>
    </View>
  );
};
export default React.memo(HomeLoader);
// const styles = StyleSheet.create({});
