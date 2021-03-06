import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import emojiSource from 'emoji-datasource';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
    isIphoneXorAbove,
    isAndroid,
    handleDefaultEmoji,
    handleCustomEmoji
} from './utils';
import CategoryTabBar from './component/CategoryTabBar';
import CategoryView from './component/CategoryView';
import { defaultProps, IconType } from './constant';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEBEF',
        width: width,
        paddingBottom: isIphoneXorAbove() ? 15 : 0
    }
});

var EMOJI_DATA = null;

export const setEmojiData = async () => {
    console.log('setEmojiData ', setEmojiData);
    EMOJI_DATA = await handleDefaultEmoji(emojiSource, defaultProps.blackList);
    EMOJI_DATA = Object.assign({}, EMOJI_DATA);
}

const EmojiBoard = ({
    showBoard = false,
    customEmoji = [],
    categories = defaultProps.categories,
    blackList = defaultProps.blackList,
    numRows = 5,
    numCols = 8,
    emojiSize = 26,
    onClick,
    onRemove,
    tabBarPosition = 'bottom',
    hideBackSpace = false,
    categoryDefautColor = '#aaa',
    categoryHighlightColor = '#000',
    categoryIconSize = 20,
    containerStyle = {},
    tabBarStyle = {},
    labelStyle = {},
    height = 300
}) => {

    let groupsView = [];
    _.each(categories, (category, key) => {
        const { name } = category;
        groupsView.push(
            <CategoryView
                category={name}
                emojis={EMOJI_DATA[name] || []}
                numRows={numRows}
                numCols={numCols}
                emojiSize={emojiSize}
                key={name}
                tabLabel={name}
                labelStyle={labelStyle}
                onClick={onClick}
            />
        );
    });

    if (!showBoard) {
        return null;
    }

 
    return (
        <View
            style={[
                styles.container,
                {
                    height: height,
                },
                containerStyle
            ]}>

            <ScrollableTabView
                tabBarPosition={tabBarPosition}
                renderTabBar={() => (
                    <CategoryTabBar
                        categories={categories}
                        onRemove={onRemove}
                        hideBackSpace={hideBackSpace}
                        tabBarStyle={tabBarStyle}
                        categoryDefautColor={categoryDefautColor}
                        categoryHighlightColor={categoryHighlightColor}
                        categoryIconSize={categoryIconSize}
                    />
                )}
                initialPage={0}
                prerenderingSiblingsNumber={1}
                style={styles.scrollTable}>

                {groupsView}

            </ScrollableTabView>



        </View>
    );
};

EmojiBoard.propTypes = {
    showBoard: PropTypes.bool,
    customEmoji: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            img: PropTypes.string,
            name: PropTypes.string,
            category: PropTypes.string,
            sort_order: PropTypes.number,
            skins: PropTypes.array
        })
    ),
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            iconType: PropTypes.oneOf([
                IconType.material,
                IconType.fontAwesome
            ]),
            icon: PropTypes.string
        })
    ),
    blackList: PropTypes.array,
    numRows: PropTypes.number,
    numCols: PropTypes.number,
    emojiSize: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    tabBarPosition: PropTypes.string,
    hideBackSpace: PropTypes.bool,
    categoryDefautColor: PropTypes.string,
    categoryHighlightColor: PropTypes.string,
    categoryIconSize: PropTypes.number,
    containerStyle: PropTypes.object,
    tabBarStyle: PropTypes.object,
    labelStyle: PropTypes.object
};

export default React.memo(EmojiBoard);
