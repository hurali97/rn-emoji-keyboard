import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import EmojiIcon from './EmojiIcon';
import { useEffect } from 'react';
import { vw } from '../Units';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    categoryView: {
        position: 'relative',
        flex: 1
    },
    categoryPageView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10
    },
    categoryLabel: {
        height: 40,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    labelText: {
        color: '#aaa',
        fontWeight: 'bold'
    }
});

const CategoryView = ({
    category,
    emojis,
    numRows,
    numCols,
    emojiSize,
    labelStyle,
    onClick
}) => {

    const [emojis_array, setEmojisArray] = useState([]);
    const [emojis_page, setEmojisPage] = useState(0);



    // Emoji count per page
    const perPage = numRows * numCols;
    const pages = Math.ceil(emojis.length / perPage);

    const clickEmoji = emoji => {
        onClick(emoji);
    };


    useEffect(() => {
       
        if(emojis_page >  0){
     
            let data = [
                ...emojis_array,
                ...getEmojis()
            ];

            setEmojisArray(data);
        }
        else{
      
            setEmojisArray(getEmojis());
        }
        

    }, [emojis_page]);




    const tabBar = () => {
        return (
            <View style={styles.categoryLabel}>
                <Text style={[styles.labelText, labelStyle]}>{category}</Text>
            </View>
        );
    };

    const getEmojis = () => {
        let data = [];
   
        if (emojis_page < pages) {
            data = _.slice(
                emojis,
                emojis_page * perPage,
                (emojis_page + 1) * perPage
            );
        }

        return data;
    }

    const onEndReached = () => {

        if (emojis_page < pages) {
            setEmojisPage(emojis_page + 1);
        }

    }


    renderItem = ({ item }) => {
   
        return <EmojiIcon
            emoji={item}
            clickEmoji={clickEmoji}
            emojiSize={emojiSize}
        />
    }

    return (
  
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={tabBar}
                renderItem={renderItem}
                data={emojis_array}
                numColumns={numCols}
                onEndReachedThreshold={0.16}
                onEndReached={onEndReached}
                contentContainerStyle={{paddingLeft: 1 * vw,}}
                keyExtractor={item=>String(item?.name)}
                removeClippedSubviews
            />

    );
};

CategoryView.propTypes = {
    category: PropTypes.string
};

export default CategoryView;
