// 我不太確定當初說要用這套件抓啥

import { useEffect, useState } from 'react'
import { getJson } from 'serpapi'

export default function GoogleSearch() {
    const [titles, setTitles] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        getJson({
            engine: "google",
            api_key: '', // Get your API_KEY from https://serpapi.com/manage-api-key
            q: "台股",
            location: "Taiwan",
          },
            (json) => {
                const topStories = json?.news_results?.top_stories || [];
                const storyTitles = topStories.map((story) => story.title);
                const storyLinks = topStories.map((story) => story.link);
                setTitles(storyTitles);
                setLinks(storyLinks);
                console.log(json["organic_results"]);
            }
        );
    }, []);

    return (
        <div>
            {titles.length > 0 ? (
                <ul>
                    {titles.map((title, index) => (
                        <li key={index}>
                            <a href={links[index]}>{title}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}