import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { vh, vw } from 'react-native-emoji-board/Units';

const styles = StyleSheet.create({
    emojiTouch: {
        paddingVertical: 0.5 * vh,
        marginHorizontal: 1 * vw,
        justifyContent: 'center',
        width: 10 * vw,
   
    },
    emoji: {
        textAlign: 'center'
    },
    emojiImg: {
        alignSelf: 'center',
        width: 5 * vw,
        height: 5 * vw,
        resizeMode: 'contain'
    }
});

const EmojiIcon = ({
    emoji,
    clickEmoji,
}) => {
    const { code, img } = emoji;
    return (
        <TouchableOpacity
            style={styles.emojiTouch}
            onPress={() => clickEmoji(emoji)}
            activeOpacity={0.7}
        >
            {code ?
                <Text style={[styles.emoji, { fontSize: 3.5 * vh }]}>{code}</Text> :
                <Image source={{ uri: img }} style={styles.emojiImg} />
            }
        </TouchableOpacity>
    );
};

EmojiIcon.propTypes = {
    emoji: PropTypes.object,
    clickEmoji: PropTypes.func,
    longPressEmoji: PropTypes.func,
    emojiWidth: PropTypes.number,
    emojiSize: PropTypes.number
};
export default EmojiIcon;
