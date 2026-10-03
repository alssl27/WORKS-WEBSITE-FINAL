'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <div className="container section empty-state"><h1>This page could not be loaded.</h1><p>Please try again or contact ABS Properties on 0161 284 0644.</p><button className="button" onClick={reset}>Try again</button></div>}
