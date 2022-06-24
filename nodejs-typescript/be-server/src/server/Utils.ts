import {parse, UrlWithParsedQuery} from 'url';

export class Utils {
    public static getUrlBasePath(url: string | undefined): string{
        if(url){
            const parseUrl = parse(url);
            console.log(parseUrl);
            return parseUrl.pathname!.split('/')[1];
        }
        return '';
    }

    public static getUrlParameters(url: string | undefined): UrlWithParsedQuery | undefined {
       if(url){
           return parse(url,true);
       }
       return undefined;
    }
}