import {Dimensions, Platform} from 'react-native';
import _ from 'lodash';
require('string.fromcodepoint');

export const toEmoji = code => {
    return String.fromCodePoint(...code.split('-').map(u => '0x' + u));
};

export const isIphoneXorAbove = () => {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 ||
            dimen.width === 812 ||
            (dimen.height === 896 || dimen.width === 896))
    );
};

export const isAndroid = () => {
    return Platform.OS === 'android';
};

export const handleDefaultEmoji = async (data, blackList) => {
    // const filteredData = data.filter(e => !_.includes(blackList, e.short_name));
    const sortedData = _.orderBy(data, 'sort_order');
    const groupedData = _.groupBy(sortedData, 'category');

    const transformData = _.mapValues(groupedData, group =>
        group.map(value => {
        
            return {
                code: toEmoji(value.unified),
                name: value.short_name,
    
            };
        })
    );

    
    return Promise.resolve(transformData);
};

export const handleCustomEmoji = (data, blackList) => {
    const filteredData = data.filter(e => !_.includes(blackList, e.name));
    const sortedData = _.orderBy(filteredData, 'sort_order');
    const groupedData = _.groupBy(sortedData, 'category');

    const transformData = _.mapValues(groupedData, group =>
        group.map(value => {
            return {
                code: value.code || null,
                img: value.img || null,
                name: value.name || null,
                skins: value.skins || null
            };
        })
    );
    return transformData;
};
